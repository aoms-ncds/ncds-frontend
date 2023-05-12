import { Moment } from 'moment';

export {};

declare global {
  interface Frrequest {
    _id: string;
    FRno: string;
    FRdate: Moment;
    divisionName: string;
    subdivisionName: string;
    mainCategory: string;
    requestAmount: string;
    lastUpdateDate: Moment;
    sanction: string;
  }
  interface FR extends MongooseDocument {
    _id: string;
    FRno: string;
    date: Moment;
    purpose: FRPurpose;
    purposeWorker?: IETWorker;
    purposeSubdivision?: SubDivision;
    purposeDivision?: IETDivisions;
    purposeCoordinator?: Staff;
    purposeOthers?: string;
    sanctionedAmount: number;
  }
  interface CreatableFR extends Creatable<FR> {
    date?: FR['date'];
    FRno?: FR['FRno'];
    purpose?: FR['purpose'];
    sanctionedAmount?: FR['sanctionedAmount'];
  }
  // interface FRPurpose{
  //     _id: string;
  //     name: string;
  // }
  type FRPurpose =
    | 'Worker'
    | 'Subdivision'
    | 'Division'
    | 'Coordinator'
    | 'Others';
  interface Coordinator {
    _id: string;
    coordinatorName: string | undefined;
  }
  interface IETWorker {
    _id: string;
    workerCode: string;
    firstName: string;
    secondName: string;
    missionaryOrNonMissionary: string;
    dob: Moment;
    gender: string;
    age: string;
    maritalStatus: string;
    highestQualification: string;
    motherToungue: string;
    communicationLanguage: string;
    languagesKnown: string;
    emailId: string;
    mobileNumber: string;
    alternativeMobileNumber: string;
    PANnumber: string;
    aadhaarNumber: string;
    voterId: string;
    licenseNumber: string;
    permanentAddress: string;
    permanentAddressCity: string;
    permanentAddressDistrict: string;
    permanentAddressState: string;
    permanentAddressCountry: string;
    permanentAddressPincode: string;
    currentAddress: string;
    currentAddressCity: string;
    currentAddressDistrict: string;
    currentAddressState: string;
    currentAddressCountry: string;
    currentAddressPincode: string;
    spouseOfAnotherStaff: string;
  }
  interface IETDivisions {
    divisionName: string;
    _id: string;
    divisionId: string;
    contactNumber: string;
    emailId: string;
    address: string;
    noofWorkers: number;
    NoOfSubdivisions: number;
    NoOfChurches: number;
    coordinatorName: string;
    coordinatorContactno: string;
    coordinatorEmail: string;
    seniorLeaderName: string;
    seiorLeaderContactno: string;
    seiorLeaderEmail: string;
    juniorLeaderName: string;
    juniorLeaderContactno: string;
    juniorLeaderEmail: string;
  }
  interface Subdivisions {
    _id: string;
    // division:IETDivisions;
    subDivisionName: string;
  }

  interface MainCategory {
    name: string;
    subcategory1: SubCategory1[];
  }
  interface SubCategory1 {
    name: string;
    subcategory2: SubCategory2[];
  }
  interface SubCategory2 {
    name: string;
    subcategory3: SubCategory3[];
  }
  interface SubCategory3 {
    name: string;
    narration: string;
  }
  interface Particulars {
    _id: string;
    mainCategory: string;
    subCategory1: string;
    subCategory2: string;
    subCategory3: string;
    quantity: string;
    month: string;
    requestedAmount: number;
    narration: string;
  }

  interface Remark extends MongooseDocument {
    remark: string;
    createdBy:User;

  }
  interface CreatableRemark extends Creatable<Remark> {
    createdBy?: User;
  }
}
