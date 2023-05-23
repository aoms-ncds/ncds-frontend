import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';
import { Creatable, MongooseDocument } from '../../../extras/CommonTypes';

export interface NewUserBasicDetails {
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
}
export interface CreatableNewUserBasicDetails
  extends Creatable<NewUserBasicDetails> {
  gender?: NewUserBasicDetails['gender'];
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
export interface NewOfficialDetails {
  dateOfJoining?: Moment;
  dateOfLeaving?: Moment;
  reasonForDeactivation?: UserDeactivationReason;
  remarks?: string;
  subdivision: SubDivision;
  selfSupport: boolean;
  status: NewOfficialDetailsStatus;
  dateOfDivisionJoining?: Moment;
  dateOfDivisionLeaving?: Moment;
  noOfChurches: number;
}
export type UserDeactivationReason =
  | 'Voluntarily Left'
  | 'Retired'
  | 'Dismissed'
  | 'Death'
  | 'Other';
export type NewOfficialDetailsStatus =
  | 'ministering'
  | 'left'
  | 'education leave'
  | 'sabbatical leave';
export interface CreatableNewOfficialDetails
  extends Creatable<NewOfficialDetails> {
  dateOfJoining?: Moment;
  subdivision?: SubDivision;
  selfSupport?: boolean;
  status?: NewOfficialDetailsStatus;
  noOfChurches?: number;
}
export interface NewUserSupportDetails {
  designation?: Designation;
  totalNoOfYearsInMinistry?: number;
  withChurch?: boolean;
}

export interface NewUserSupportStructure {
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
  kind: UserKind;
  basicDetails: NewUserBasicDetails;
  officialDetails: NewOfficialDetails;
  supportDetails: NewUserSupportDetails;
  supportStructure: NewUserSupportStructure;
  status?: UserLifeCycleStates;
}
export interface CreatableNewUser extends Creatable<NewUser> {
  kind: UserKind;
  basicDetails: CreatableNewUserBasicDetails;
  officialDetails: CreatableNewOfficialDetails;
  supportDetails: NewUserSupportDetails;
  supportStructure: NewUserSupportStructure;
}

export type UserKind = 'staff' | 'worker';
export type Gender = 'Male' | 'Female' | 'Other';
export type MaritalStatus = 'Married' | 'Unmarried';
export type WorkerField = 'Missionary' | 'Non-Missionary';

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: IWorker;
}

export interface Address {
  buildingName?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}
