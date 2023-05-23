import { CreatableNewUser, User } from '../../User/extras/UserTypes';

export interface Staff extends User {
  staffCode: string;
}

export interface CreatableStaff extends CreatableNewUser {
  staffCode?: string;
}
