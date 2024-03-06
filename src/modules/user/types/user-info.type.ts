import { Role } from "./role.type";

export interface IUserInfo {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  role: Role;
}