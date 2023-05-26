export default {};

declare global {
   interface Staff extends User {
    staffCode: string;
  }

   interface CreatableStaff extends CreatableUser {
    staffCode?: string;
  }
}
