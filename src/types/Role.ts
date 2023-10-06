import Permission from '@/types/Permission';
import User from '@/types/User';

export default interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  permissions: Permission[];
  users: User[];
}
