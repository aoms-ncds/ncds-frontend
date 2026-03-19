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
