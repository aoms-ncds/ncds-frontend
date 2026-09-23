<<<<<<< HEAD
import { Moment } from 'moment';

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
=======
import { Moment } from 'moment';

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
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
