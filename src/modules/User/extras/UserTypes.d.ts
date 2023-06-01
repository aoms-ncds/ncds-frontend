import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';

export default {};

declare global {
  type UserKind = 'staff' | 'worker';

  interface BasicDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: Moment;
    gender?: Gender;
    field?: WorkerField;
    martialStatus?: MaritalStatus;
    highestQualification?: string;
    motherTongue?: Language;
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
    currentOfficialAddress: Address;
    residingAddress: Address;
    spouseOfAnother?: User;
  }
  interface CreatableBasicDetails extends Creatable<BasicDetails> {
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
  interface OfficialDetails {
    dateOfJoining?: Moment;
    dateOfLeaving?: Moment;
    reasonForDeactivation?: DeactivationReason;
    remarks?: string;
    division?: Division;
    subdivision?: SubDivision;
    selfSupport: boolean;
    status: OfficialDetailsStatus;
    dateOfCurrentDivisionJoining?: Moment;
    dateOfPreviousDivisionLeaving?: Moment;
    noOfChurches: number;
  }
  type DeactivationReason = 'Voluntarily Left' | 'Retired' | 'Dismissed' | 'Death' | 'Other';
  type OfficialDetailsStatus = 'Ministering' | 'Left' | 'Education Leave' | 'Sabbatical Leave';
  interface CreatableOfficialDetails extends Creatable<OfficialDetails> {
    dateOfJoining?: Moment;
    division?: Division;
    subdivision?: SubDivision;
    selfSupport?: boolean;
    status?: OfficialDetailsStatus;
    noOfChurches?: number;
  }
  interface SupportDetails {
    designation?: Designation;
    totalNoOfYearsInMinistry?: number;
    withChurch?: boolean;
  }

  interface SupportStructure {
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
    basicDetails: BasicDetails;
    officialDetails: OfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
    status?: UserLifeCycleStates;
  }
  interface CreatableUser extends Creatable<User> {
    basicDetails: CreatableBasicDetails;
    officialDetails: CreatableOfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
  }

  type Gender = 'Male' | 'Female' | 'Other';
  type MaritalStatus = 'Married' | 'Unmarried';
  type WorkerField = 'Missionary' | 'Non-Missionary';

  interface LoginCredentials {
    email: string;
    password: string;
  }
  interface LoginResponse {
    token: string;
    user: User;
  }
}
