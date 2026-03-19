import { Moment } from 'moment';
import UserLifeCycleStates from './UserLifeCycleStates';
import { FabTypeMap } from '@mui/material';
import { ObjectId } from 'mongoose';
import { IPmaDedution } from '../../HR/PnaDeductionPage';

export default {};

declare global {
  type UserKind = 'staff' | 'worker';
  interface IUserPermissions extends MongooseDocument {

    READ_ACCESS: boolean;// Basic access permission
    ADMIN_ACCESS: boolean;// Admin access

    READ_WORKERS: boolean; // For reading workers
    WRITE_WORKERS: boolean; // For adding and editing worker details
    MANAGE_WORKER: boolean;// For approving Workers

    READ_STAFFS: boolean;// For reading staffs
    WRITE_STAFFS: boolean;// For adding and editing staff details

    READ_DIVISIONS: boolean; // For reading divisions
    READ_ALL_DIVISIONS: boolean; // For reading All divisions
    WRITE_DIVISIONS: boolean; // For adding and editing division details

    READ_FR: boolean; // For reading FRs
    WRITE_FR: boolean; // For adding and editing FR details
    PRESIDENT_ACCESS: boolean;// President access
    MANAGE_FR: boolean;// For Approving FR
    RAISE_WORKERS_FR:boolean;// For RAISE WORKERS FR

    READ_IRO: boolean; // For reading IROs
    WRITE_IRO: boolean; // For editing IRO details
    OFFICE_MNGR_ACCESS: boolean;// For Office Mngr
    ACCOUNTS_MNGR_ACCESS: boolean;// For Accounts Mngr access
    MANAGE_IRO: boolean;//  For approving IRO

    READ_APPLICATION: boolean; // For reading applications
    WRITE_APPLICATION: boolean; // For adding and editing application details
    MANAGE_APPLICATION: boolean;// For approving Application

    FCRA_ACCOUNTS_ACCESS: boolean;
    LOCAL_ACCOUNT_ACCESS: boolean;
    OTHER_ACCOUNTS_ACCESS: boolean;
    HR_DPARTMENT_ACCESS: boolean;
    DELHI_DIVISION_ACCESS: boolean;

    OTHER_ACCOUNTS_ACCESS_1: boolean;
    OTHER_ACCOUNTS_ACCESS_2: boolean;
    OTHER_ACCOUNTS_ACCESS_3: boolean;
    OTHER_ACCOUNTS_ACCESS_4: boolean;

    EDIT_DIVISION_ACCESS: boolean;
    WAITTING_FOR_RELEASE_AMOUNT: boolean;
    AUDIT_VIEW: boolean;
    CUSTOM_FR_IRO: boolean;
    CUSTOM_REPORT: boolean;
    REOPEN_FR_IRO: boolean;

    SETTINGS_SETTINGS_BASE_ACCESS: boolean;

    SETTINGS_MANAGE_LANGUAGES_ACCESS: boolean;
    SETTINGS_DESIGNATION_ACCESS: boolean;
    SETTINGS_CHILD_SUPPORT_ACCESS: boolean;
    SETTINGS_E_SIGN_ACCESS: boolean;
    SETTINGS_DEPARTMENT_ACCESS: boolean;
    SETTINGS_CHILD_SUPPORT_AGE_EDIT_ACCESS: boolean;
    SETTINGS_ADD_GENDER_ACCESS: boolean;
    SETTINGS_ADD_RELIGION_ACCESS: boolean;
    SETTINGS_REASON_FOR_DEACTIVATION_ACCESS: boolean;
    SETTINGS_ADD_SANCTION_ASS_PER_ACCESS: boolean;
    SETTINGS_PARTICULARS_ACCESS: boolean;
    SETTINGS_ADD_PAYMENT_METHOD_ACCESS: boolean;
    SETTINGS_DESIGNATION_CATEGORY_ACCESS: boolean;
    SETTINGS_LEADER_DETAILS_ACCESS: boolean;
    SETTINGS_FR_IRO_LOG_ACCESS: boolean;
    SETTINGS_APPLICATION_ACCESS: boolean;
  }
  type Permission = keyof Omit<IUserPermissions, '_id' | '__v' | 'createdAt' | 'updatedAt'>;
  interface BasicDetails {
    firstName: string;
    middleName: string;
    organization?: string;
    title?: string;
   daughterOrganization?:string;
    lastName: string;
    dateOfBirth: Moment;
    gender?: IGender;
    field?: WorkerField;
    martialStatus?: MaritalStatus;
    religion?: IReligion;
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
    spouseOf?:User;
  }
  interface CreatableBasicDetails extends Creatable<BasicDetails> {
    // gender?: IGender;
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
    dateOfLeaving?: Moment | null;
    eSign?: FileObject | null;
    reasonForDeactivation?: DeactivationReason;
    remarks?: string;
    divisionHistory: DivisionHistory[];
    status: OfficialDetailsStatus;
    noOfChurches: number;


  }


  type DivisionHistory = {
    _id: string;
    division: Division;
    subDivision: SubDivision;
    dateOfDivisionJoining?: Moment | null;
    dateOfDivisionLeaving?: Moment | null;
  };
  type CreatableDivisionHistory = {
    division?: Division | null;
    subDivision?: SubDivision | null;
    dateOfDivisionJoining?: Moment | null;
    dateOfDivisionLeaving?: Moment | null;
  };
  type DeactivationReason = [];
  type OfficialDetailsStatus = 'Active' | 'Left' | 'Education Leave' | 'Sabbatical Leave' | null;
  type TypeOfFamily = 'Single' | 'Family';
  interface CreatableOfficialDetails extends Creatable<OfficialDetails> {
    dateOfJoining?: Moment;
    divisionHistory: CreatableDivisionHistory[];
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
    selfSupport: boolean;
    percentageofSelfSupport: number;
    totalAmount?: number;
    monthlyDeduction?: number;
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
    pmaDeduction?:IPmaDedution|null;
    prevPmaDeduction?:number;
    pmaDeductionLastUpdatedAt?: Moment | null;

  }
  interface User extends MongooseDocument {
    kind: readonly 'staff' | 'worker';
    imageURL?: string;
    basicDetails: BasicDetails;
    officialDetails: OfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
    status?: UserLifeCycleStates;
    permissions?: IUserPermissions;
    tokens: string[];
    insurance?: Insurance;
    division?: Division;

  }
  interface CreatableUser extends Creatable<User> {
    basicDetails: CreatableBasicDetails;
    officialDetails: CreatableOfficialDetails;
    supportDetails: SupportDetails;
    supportStructure: SupportStructure;
    insurance?: Insurance;

  }

  // type Gender = 'Male' | 'Female' | 'Other';
  type MaritalStatus = 'Married' | 'Unmarried';
  type WorkerField = 'Field' | 'Office Staff';
  // type Religion = 'Hindu' | 'Muslim' | 'Christian' | 'Sikh';
  interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface IVerifyOTPRequest {
    auth_process_id: string;
    OTP: string;
  }
  interface LoginResponse {
    token: string;
    user: User;
  }
  interface getOtpResponse {
    auth_process_id: string;
    status: number;
  }


 interface IUserUpdateLog extends Document{
  userCode:string;
  userId:string;
  field:string;
  doneBy:User;
  createdAt: Moment;
  updatedAt: Moment;
  }
  }
