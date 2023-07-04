import { Moment } from 'moment';

export default {};

declare global {
  interface Child extends MongooseDocument {
    childCode:string;
    firstName: string;
    lastName: string;
    dateOfBirth: Moment;
    childOf: IWorker | null;
    childSupport: ChildSupport;
    studying: boolean;
    classOfStudy: string;
    working: boolean;
    occupation: string;
    qualification: string;
  }
  interface CreatableChild extends Creatable<Child> {
    childCode?:string;
    dateOfBirth?: Moment;
    childOf?: IWorker | null;
    childSupport?: ChildSupport;
    studying?: boolean;
    classOfStudy?: string;
    working?: boolean;
    occupation?: string;
    qualification?: string;
  }

  interface ChildSupport extends MongooseDocument{
    map(arg0: (item: ChildSupport) => { _id: string; name: string; status: number; amount: number; }): unknown;
    name: string;
    status: number;
    amount: number;
  }
}
