import { Moment } from 'moment';
export default {};

declare global {
  interface Spouse extends MongooseDocument {
    spouseCode:string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Moment;
    spouseOf: IWorker;
    working?: boolean;
    occupation?: string;
    qualification?: string;
    knownLanguages?: ILanguage[];
    insurance?: Insurance;
  }
  interface CreatableSpouse extends Creatable<Spouse> {
    spouseCode?:string;
    spouseOf?: IWorker;
  }
}
