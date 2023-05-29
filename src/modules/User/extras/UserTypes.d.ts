import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';
import { Creatable, MongooseDocument, Address, Language, FileObject } from '../../../extras/CommonTypes';
import { SubDivision } from '../../Divisions/extras/DivisionsTypes';
import { Designation } from '../../HR/extras/DesignationTypes';


export default {};

export type UserKind = 'staff' | 'worker';

export interface BasicDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: Moment;
  gender?: Gender;
  field?: WorkerField;
  martialStatus?: MaritalStatus;
  highestQualification?: string;
  motherTounge?: Language;
  communicationLanguage?: Language;
  knownLanguages?: Language[];
  email: string;
  phone?: string;
  alternativePhone?: string;
  PANNo?: string;
  aadhaar?: {
    aadhaarNo?: string;
    aadhaarFile?: FileObject;
  };
  voterId?: {
    voterIdNo?: string;
    voterIdFile?: FileObject;
  };
  licenseNumber?: string;
  permanentAddress: Address;
  currentAddress: Address;
  spouseOfAnotherUser?:User;
}
export interface CreatableBasicDetails extends Creatable<BasicDetails> {
  gender?: BasicDetails['gender'];
  dateOfBirth?: Moment;
  aadhaar?: {
    aadhaarNo?: string;
    aadhaarFile?: FileObject;
  };
  voterId?: {
    voterIdNo?: string;
    voterIdFile?: FileObject;
  };
}
export interface OfficialDetails {
  dateOfJoining?: Moment;
  dateOfLeaving?: Moment;
  reasonForDeactivation?: DeactivationReason;
  remarks?: string;
  subdivision: SubDivision;
  selfSupport: boolean;
  status: OfficialDetailsStatus;
  dateOfDivisionJoining?: Moment;
  dateOfDivisionLeaving?: Moment;
  noOfChurches: number;
}
export type DeactivationReason = 'Voluntarily Left' | 'Retired' | 'Dismissed' | 'Death' | 'Other';
export type OfficialDetailsStatus = 'Ministering'| 'Left'| 'Education Leave'| 'Sabbatical Leave';
export interface CreatableOfficialDetails extends Creatable<OfficialDetails> {
  dateOfJoining?: Moment;
  subdivision?: SubDivision;
  selfSupport?: boolean;
  status?: OfficialDetailsStatus;
  noOfChurches?: number;
}
export interface SupportDetails {
  designation?: Designation;
  totalNoOfYearsInMinistry?: number;
  withChurch?: boolean;
}

export interface SupportStructure {
  basic?: number;
  HRA?: number;
  spouseAllowance?: number;
  positionalAllowance?: number;
  specialAllowance?: number;
  impactDeduction?: number;
  telAllowance?: number;
  PIONMissionaryFund?: number;
  MUTDeduction?: number;
}
export interface User extends MongooseDocument {
  basicDetails: BasicDetails;
  officialDetails: OfficialDetails;
  supportDetails: SupportDetails;
  supportStructure: SupportStructure;
  status?: UserLifeCycleStates;
}
export interface CreatableUser extends Creatable<User> {
  basicDetails: CreatableBasicDetails;
  officialDetails: CreatableOfficialDetails;
  supportDetails: SupportDetails;
  supportStructure: SupportStructure;
}


export type Gender = 'Male' | 'Female' | 'Other';
export type MaritalStatus = 'Married' | 'Unmarried';
export type WorkerField = 'Missionary' | 'Non-Missionary';

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}
