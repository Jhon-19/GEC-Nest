import { Role } from './role.type';

export interface IUserItem {
  id: string;
  username: string;
  fullName: string;
  role: Role;
}
