<<<<<<< HEAD
import { Moment } from 'moment';

export default {};
declare global {
  interface IWorker extends User {
    spouse?: Spouse;
    children: Child[];
    workerCode: string;
  }
  interface CreatableIWorker extends CreatableUser {
    spouse?: CreatableSpouse;
    children: Child[];
    workerCode?: string;
  }

}
=======
import { Moment } from 'moment';

export default {};
declare global {
  interface IWorker extends User {
    spouse?: Spouse;
    children: Child[];
    workerCode: string;
  }
  interface CreatableIWorker extends CreatableUser {
    spouse?: CreatableSpouse;
    children: Child[];
    workerCode?: string;
  }

}
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
