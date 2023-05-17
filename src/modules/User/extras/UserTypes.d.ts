import { Moment } from 'moment';

export {};

declare global {
  interface User extends MongooseDocument {
    firstName: string;
    lastName: string;
    dob: Moment;
    doj?: Moment;
    gender: Gender;
    age: number;
    maritalStatus?: MaritalStatus;
    phone: string;
    email: string;
    spouse?: User;
  }
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
      aadhaarNo: string;
      aadhaarFile?: string;
    };
    voterId?: {
      voterIdNo: string;
      voterIdFile?: string;
    };
    licenseNumber?: string;
    permanentAddress: Address;
    currentAddress: Address;
  }
  interface CreatableNewUserBasicDetails extends Creatable<NewUserBasicDetails>{
    gender?: NewUserBasicDetails['gender'];
    aadhaar?: {
      aadhaarNo: string;
      aadhaarFile?: UploadableFile;
    };
    voterId?: {
      voterIdNo: string;
      voterIdFile?: UploadableFile;
    };
  }
  interface NewUser extends MongooseDocument {
    workerCode: string;
    basicDetails: NewUserBasicDetails;
  }
  interface CreatableNewUser extends Creatable<NewUser>{
    workerCode?: NewUser['workerCode'];
    basicDetails: CreatableNewUserBasicDetails;
  }

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
    streetAddress?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  }
}
