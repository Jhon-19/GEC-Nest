import { Role } from 'src/modules/user/types/role.type';

export interface IUserPayload {
  id: string;
  username: string;
  role?: Role;
}
