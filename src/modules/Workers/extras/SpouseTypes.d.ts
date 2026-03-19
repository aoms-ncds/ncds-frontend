import { Moment } from 'moment';
export default {};

declare global {
  interface Spouse extends MongooseDocument {
    spouseCode: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    ProfileAddedOn?: Moment;
    dateOfBirth?: Moment;
    spouseOf: IWorker;
    working?: boolean;
    occupation?: string;
    qualification?: string;
    knownLanguages?: ILanguage[];
    insurance?: Insurance;
    reasonForDeactivation?: DeactivationReason;
    deactivationDate?:Moment;
    aadharNo?:number;
    widowCare?:boolean;
  }

  interface CreatableSpouse extends Creatable<Spouse> {
    spouseCode?: string;
    spouseOf?: IWorker;
  }
}
