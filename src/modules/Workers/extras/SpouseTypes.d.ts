import { Moment } from 'moment';
export default {};

declare global {
   interface Spouse extends MongooseDocument {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Moment;
    spouseOf: IWorker;
    working?: boolean;
    occupation?: string;
    qualification?: string;
    knownLanguages?: Language[];
  }
   interface CreatableSpouse extends Creatable<Spouse> {
    spouseOf?: IWorker;
  }
}
