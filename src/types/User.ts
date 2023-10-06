import Role from '@/types/Role';

export default interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
}
