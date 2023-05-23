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
  // interface IETWorker extends User {
  //   _id: string;
  //   workerCode: string;
  //   missionaryOrNonMissionary: string;
  //   highestQualification: string;
  //   motherToungue: Language;
  //   communicationLanguage: Language;
  //   languagesKnown: Language[];
  //   alternativeMobileNumber: string;
  //   PANNo: string;
  //   aadhaar: {
  //     aadhaarNo: string;
  //     aadhaarFile: FileObject;
  //   };
  //   voterId: {
  //     voterIdNo: string;
  //     voterIdFile: FileObject;
  //   };
  //   licenseNumber: string;
  //   permanentAddress: Address;
  //   currentAddress: Address;
  // }

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
    requestedAmount: string;
    narration: string;
  }

  interface Remark extends MongooseDocument {
    remark: string;
    createdBy: User;
  }
  interface CreatableRemark extends Creatable<Remark> {
    createdBy?: User;
  }
}
