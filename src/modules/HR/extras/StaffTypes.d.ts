export interface Staff extends User {
  staffCode: string;
}

export interface CreatableStaff extends CreatableNewUser {
  staffCode?: string;
}
