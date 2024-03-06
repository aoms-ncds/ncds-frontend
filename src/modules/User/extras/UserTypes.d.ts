import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';

export default {};

declare global {
  type UserKind = 'staff' | 'worker';
  interface IUserPermissions extends MongooseDocument {

    READ_ACCESS: boolean;// Basic access permission
    ADMIN_ACCESS:boolean;// Admin access

    READ_WORKERS: boolean; // For reading workers
    WRITE_WORKERS: boolean; // For adding and editing worker details
    MANAGE_WORKER:boolean;// For approving Workers

    READ_STAFFS: boolean;// For reading staffs
    WRITE_STAFFS: boolean;// For adding and editing staff details

    READ_DIVISIONS: boolean; // For reading divisions
    READ_ALL_DIVISIONS: boolean; // For reading All divisions
    WRITE_DIVISIONS: boolean; // For adding and editing division details

    READ_FR: boolean; // For reading FRs
    WRITE_FR: boolean; // For adding and editing FR details
    PRESIDENT_ACCESS:boolean;// President access
    MANAGE_FR:boolean;// For Approving FR

    READ_IRO: boolean; // For reading IROs
    WRITE_IRO: boolean; // For editing IRO details
    OFFICE_MNGR_ACCESS :boolean;// For Office Mngr
    ACCOUNTS_MNGR_ACCESS:boolean;// For Accounts Mngr access
    MANAGE_IRO:boolean;//  For approving IRO

    READ_APPLICATION:boolean; // For reading applications
    WRITE_APPLICATION:boolean; // For adding and editing application details
    MANAGE_APPLICATION:boolean;// For approving Application

    FCRA_ACCOUNTS_ACCESS:boolean;
    LOCAL_ACCOUNT_ACCESS:boolean;
    PERSONAL_ACCOUNTS_ACCESS:boolean;

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
    designation?: IDesignation;
    otherDesignation?: string;
    totalNoOfYearsInMinistry?: number;
    typeOfFamily?: TypeOfFamily;
    withChurch?: boolean;
    department?: Department;
  }

  interface Insurance {
    impactNo?: string;
    dojInsurance?: Moment;
    nominee?: string;
    relation?: string;
  }

  interface SupportStructure {
    basic?: number;
    prevBasic?: number;
    basicLastUpdatedAt?:Moment ;
    HRA?: number;
    prevHRA?: number;
    HRALastUpdatedAt?:Moment ;
    spouseAllowance?: number;
    prevSpouseAllowance?: number;
    spouseAllowanceLastUpdatedAt?:Moment ;
    positionalAllowance?: number;
    prevPositionalAllowance?: number;
    positionalAllowanceLastUpdatedAt?:Moment ;
    specialAllowance?: number;
    prevSpecialAllowance?: number;
    specialAllowanceLastUpdatedAt?:Moment ;
    impactDeduction?: number;
    prevImpactDeduction?: number;
    impactDeductionLastUpdatedAt?:Moment ;
    telAllowance?: number;
    prevTelAllowance?: number;
    telAllowanceLastUpdatedAt?:Moment ;
    PIONMissionaryFund?: number;
    prevPIONMissionaryFund?: number;
    PIONMissionaryFundLastUpdatedAt?:Moment ;
    MUTDeduction?: number;
    prevMUTDeduction?: number;
    MUTDeductionLastUpdatedAt?:Moment ;
    supportEnabled?:boolean;
    reason?:string;
    disabledFrom?:Moment|null;
    disabledTo?:Moment|null;

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
    insurance?: Insurance;
    division?:Division;

  }
  interface CreatableUser extends Creatable<User> {
    basicDetails: CreatableBasicDetails;
    officialDetails: CreatableOfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
    insurance?: Insurance;

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
