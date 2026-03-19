import { Moment } from 'moment';

export default {};

declare global {
  interface Child extends MongooseDocument {
    childCode: string;
    firstName: string;
    lastName: string;
    childProfile: string;
    dateOfBirth: Moment;
    childOf: IWorker | null;
    childSupport: IChildSupport;
    studying: boolean;
    classOfStudy: string;
    working: boolean;
    occupation: string;
    qualification: string;
    gender?: Gender;
    profileAddedOn?: Moment;
    adharCardNo?: number;
    phoneNumber?: number;
    emailId?: string;
    higherEducation?: boolean;
    ageOverRide?: boolean;
    courseName: string;
    totalAmountforCourse: number;
    startingYear: Moment;
    endingYear: Moment;
    reasonForDeactivation?: DeactivationReason;
    deactivationDate?:Moment;
    prevCeaAmountDate?:Moment;
    studyHelp?:number;
    supportEnabled?:boolean;
    reason?:string;
    disabledFrom?:Moment;
    disabledTo?:Moment;
    remark?:string;


  }
  interface CreatableChild extends Creatable<Child> {
    childCode?: string;
    dateOfBirth?: Moment;
    childOf?: IWorker | null;
    childProfile: string;
    childSupport?: IChildSupport;
    studying?: boolean;
    classOfStudy?: string;
    working?: boolean;
    occupation?: string;
    qualification?: string;
    gender?: Gender;
    profileAddedOn?: Moment;
    adharCardNo?: number;
    studyHelp?: number;
    phoneNumber?: number;
    emailId?: string;
    higherEducation?: boolean;
    ageOverRide?: boolean;
    courseName?: string;
    totalAmountforCourse?: number;
    startingYear?: Moment;
    endingYear?: Moment;
    reasonForDeactivation?: DeactivationReason;
    deactivationDate?:Moment;
    remark?:string;
  }

  // interface IChildSupport extends MongooseDocument{
  //   name: string;
  //   status: number;
  //   amount: number;
  // }
}
