import { CreatableUser, User } from '../../User/extras/UserTypes';

export interface Staff extends User {
  staffCode: string;
}

export interface CreatableStaff extends CreatableUser {
  staffCode?: string;
}
