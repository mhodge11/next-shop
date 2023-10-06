import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Field, Input, Page } from '@/components';
import { useSignIn } from '@/hooks';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const valid = await signIn(email, password);
    if (valid) router.push('/');
  };

  return (
    <Page title='Sign In'>
      <form onSubmit={handleSubmit}>
        <Field label='Email'>
          <Input
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label='Password'>
          <Input
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {signInError && <p className='text-red-700'>Invalid credentials</p>}
        {signInLoading ? (
          <p className='my-2'>Loading...</p>
        ) : (
          <Button type='submit'>Sign In</Button>
        )}
      </form>
    </Page>
  );
}
