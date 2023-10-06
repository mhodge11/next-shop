import Role from '@/types/Role';

export default interface Permission {
  id: number;
  type: string;
  controller: string;
  action: string;
  enabled: boolean;
  policy: string;
  role: Role;
}
