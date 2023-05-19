import { Moment } from 'moment';
import OfficialDetails from '../../Workers/OfficialDetails';

export {};

declare global {
  // interface User extends MongooseDocument {
  //   firstName: string;
  //   lastName: string;
  //   dob: Moment;
  //   doj?: Moment;
  //   gender: Gender;
  //   age: number;
  //   maritalStatus?: MaritalStatus;
  //   phone: string;
  //   email: string;
  //   spouse?: User;
  // }
  interface NewUserBasicDetails{
    firstName: string;
    lastName: string;
    dateOfBirth?: Moment;
    gender: Gender;
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
      aadhaarFile?: string;
    };
    voterId?: {
      voterIdNo?: string;
      voterIdFile?: string;
    };
    licenseNumber?: string;
    permanentAddress: Address;
    currentAddress: Address;
  }
  interface CreatableNewUserBasicDetails extends Creatable<NewUserBasicDetails>{
    gender?: NewUserBasicDetails['gender'];
    aadhaar?: {
      aadhaarNo?: string;
      aadhaarFile?: UploadableFile;
    };
    voterId?: {
      voterIdNo?: string;
      voterIdFile?: UploadableFile;
    };
  }
  interface NewOfficialDetails{
    dateOfJoining: Moment;
    dateOfLeaving?: Moment;
    reasonForDeactivation?: UserDeactivationReason;
    remarks: string;
    subdivision: SubDivision;
    selfSupport: boolean;
    status: NewOfficialDetailsStatus;
    dateOfDivisionJoining?: Moment;
    dateOfDivisionLeaving?: Moment;
    noOfChurches: number;
  }
  type UserDeactivationReason = 'Voluntarily Left'|'Retired'|'Dismissed'|'Death'|'Other'
  type NewOfficialDetailsStatus = 'ministering'|'left'|'education leave'|'sabbatical leave';
  interface CreatableNewOfficialDetails extends Creatable<NewOfficialDetails>{
    dateOfJoining?: Moment;
    subdivision?: SubDivision;
    selfSupport?: boolean;
    status?: NewOfficialDetailsStatus;
    noOfChurches?: number;
  }
  interface NewUserSupportDetails{
    designation?: Designation;
    totalNoOfYearsInMinistry: number;
    withChurch: boolean;
  }
  interface CreatableNewUserSupportDetails extends Creatable<NewUserSupportDetails>{
    totalNoOfYearsInMinistry?: number;
    withChurch?: boolean;
  }

  interface NewUserSupportStructure{
    basic: number;
    HRA: number;
    spouseAllowance: number;
    positionalAllowance: number;
    specialAllowance: number;
    impactDeduction: number;
    telAllowance: number;
    PIONMissionaryFund: number;
    MUTDeduction: number;
  }
  interface CreatableNewUserSupportStructure extends Creatable<NewUserSupportStructure>{
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
  interface User extends MongooseDocument {
    workerCode: string;
    basicDetails: NewUserBasicDetails;
    officialDetails: NewOfficialDetails;
    supportDetails: NewUserSupportDetails;
    supportStructure: NewUserSupportStructure;
  }
  interface CreatableNewUser extends Creatable<NewUser>{
    workerCode?: NewUser['workerCode'];
    kind: UserKind;
    basicDetails: CreatableNewUserBasicDetails;
    officialDetails: CreatableNewOfficialDetails;
    supportDetails: CreatableNewUserSupportDetails;
    supportStructure: CreatableNewUserSupportStructure;
  }

  type UserKind = 'staff'|'worker';
  type Gender = 'Male' | 'Female' | 'Other';
  type MaritalStatus = 'Married' | 'Unmarried';
  type WorkerField = 'missionary' | 'non-missionary';

  interface LoginCredentials {
    email: string;
    password: string;
  }
  interface LoginResponse {
    token: string;
    user: User;
  }

  interface Address {
    buildingName?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  }
}
