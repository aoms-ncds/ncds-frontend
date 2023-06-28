import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';
import { Types } from 'mongoose';

export default {};

declare global {
  type UserKind = 'staff' | 'worker';
  interface IUserPermissions extends MongooseDocument {
    ADMIN_ACCESS: boolean;
    READ_WORKERS: boolean;
    WRITE_WORKERS: boolean;
    READ_STAFFS: boolean;
    WRITE_STAFFS: boolean;
    READ_DIVISIONS: boolean;
    WRITE_DIVISIONS: boolean;
    READ_FR: boolean;
    WRITE_FR: boolean;
    READ_IRO: boolean;
    WRITE_IRO: boolean;
    READ_XYZ: boolean;
    WRITE_XYZ: boolean;
    ACCOUNTS_ACCESS:boolean;
    PRESIDENT_ACCESS:boolean;
    OFFICE_MNGR_APPROVED :boolean;
    ACCOUNTS_MNGR_APPROVED:boolean;


  }
  type Permission = keyof Omit<IUserPermissions, '_id' | '__v' | 'createdAt' | 'updatedAt'>;
  interface BasicDetails {
    firstName: string;
    lastName: string;
    dateOfBirth: Moment;
    gender?: Gender;
    field?: WorkerField;
    martialStatus?: MaritalStatus;
    religion?:Religion;
    highestQualification?: string;
    motherTongue?: ILanguage;
    communicationLanguage?: ILanguage;
    knownLanguages?: ILanguage[];
    email: string;
    email2?: string;
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
    insurance?: {
      impactNo?: string;
      dojInsurance?: Moment;
      nominee?: string;
      relation?: string;
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
    dateOfLeaving?: Moment|null;
    reasonForDeactivation?: DeactivationReason;
    remarks?: string;
    divisionHistory:DivisionHistory[];
    selfSupport: boolean;
    status: OfficialDetailsStatus;
    noOfChurches: number;
  }
  type DivisionHistory ={
    _id:string;
    division: Division;
    subDivision: SubDivision;
    dateOfDivisionJoining?: Moment|null;
    dateOfDivisionLeaving?: Moment|null;
  };
  type CreatableDivisionHistory ={
    division?: Division|null;
    subDivision?: SubDivision|null;
    dateOfDivisionJoining?: Moment|null;
    dateOfDivisionLeaving?: Moment|null;
  };
  type DeactivationReason = 'Voluntarily Left' | 'Retired' | 'Dismissed' | 'Death' | 'Other';
  type OfficialDetailsStatus = 'Ministering' | 'Left' | 'Education Leave' | 'Sabbatical Leave'|null;
  type TypeOfFamily='Single Missionary'|'Family Missionary';
  interface CreatableOfficialDetails extends Creatable<OfficialDetails> {
    dateOfJoining?: Moment;
    divisionHistory:CreatableDivisionHistory[];
    selfSupport?: boolean;
    status?: OfficialDetailsStatus;
    noOfChurches?: number;
  }
  interface SupportDetails {
    designation?: Designation;
    totalNoOfYearsInMinistry?: number;
    typeOfFamily?: TypeOfFamily;
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
    kind: readonly 'staff'|'worker';
    imageURL?: string;
    basicDetails: BasicDetails;
    officialDetails: OfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
    status?: UserLifeCycleStates;
    permissions?: IUserPermissions;
    tokens: string[];

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
type Religion='Hindu'| 'Muslim'| 'Christian'|'Sikh';
  interface LoginCredentials {
    email: string;
    password: string;
  }
  interface LoginResponse {
    token: string;
    user: User;
  }
}
