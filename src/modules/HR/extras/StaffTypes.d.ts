export default {};

declare global {
  interface Staff extends User {
    staffCode: string;
    spouseOfAnother?: User;
  }

  interface CreatableStaff extends CreatableUser {
    staffCode?: string;
    spouseOfAnother?: User;
  }
}
