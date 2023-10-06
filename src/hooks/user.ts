import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchJson } from '@/lib/api';

const USER_QUERY_KEY = 'user';

interface SignInMutationProps {
  email: string;
  password: string;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ email, password }: SignInMutationProps) =>
    fetchJson('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  );

  return {
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        console.log('error signing in:', err);
        return false;
      }
    },
  };
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson('/api/logout'));

  return async () => {
    try {
      await mutation.mutateAsync();
      queryClient.setQueryData(USER_QUERY_KEY, undefined);
      return true;
    } catch (err) {
      console.log('error signing out:', err);
      return false;
    }
  };
}

export function useUser() {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        const user = await fetchJson('/api/user');
        return user;
      } catch (err) {
        console.log('not signed in:', err);
        return undefined;
      }
    },
    { cacheTime: Infinity, staleTime: 30000 }
  );

  return query.data as { id: number; name: string } | undefined;
}
