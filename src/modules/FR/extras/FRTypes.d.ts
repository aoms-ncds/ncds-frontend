import { Moment } from 'moment';
import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';

export interface Frrequest {
  _id: string;
  FRno: string;
  FRdate: Moment;
  divisionName: string;
  subdivisionName: string;
  mainCategory: string;
  requestAmount: string;
  lastUpdateDate: Moment;
  sanction: string;
  Particulars:Particulars[];
}
export interface FR extends MongooseDocument {
  _id: string;
  FRno: string;
  FRdate: Moment | undefined;
  purpose: FRPurpose;
  purposeWorker?: IETWorker;
  purposeSubdivision?: SubDivision;
  purposeDivision?: IETDivisions;
  purposeCoordinator?: IWorker;
  purposeOthers?: string;
  requestedAmount: number;
  mainCategory:string;
  sanctionedAmount: number;
  Particulars?:Particulars[];
  sanctionedAsPer?:string;
  sanctionedBank?:string;
  status?:string;
}
export interface CreatableFR extends Creatable<FR> {
  FRdate?: Moment;
  FRno?: FR['FRno'];
  purpose?: FR['purpose'];
  sanctionedAmount?: FR['sanctionedAmount'];
  Particulars?: FR['Particulars'];
  requestedAmount?: FR['requestedAmount'];
  mainCategory?:FR['mainCategory'];
  purposeWorker?: FR['purposeWorker'];
  purposeSubdivision?: FR['purposeSubdivision'];
  purposeDivision?: FR['purposeDivision'];
  purposeCoordinator?: FR['purposeCoordinator'];
  sanctionedAsPer?:FR['sanctionedAsPer'];
  sanctionedBank?:FR['sanctionedBank'];
  status?:string;
}
// export interface FRPurpose{
//     _id: string;
//     name: string;
// }
export type FRPurpose =
  | 'Worker'
  | 'Subdivision'
  | 'Division'
  | 'Coordinator'
  | 'Others';

export type SanctionedAsPer =
  | 'As per sanction by Manager'
  | 'As per policy'
  | 'As Per List Attached'
  | 'As Per Ticket Attached'
  | 'As Per Bill Attached'
  |'As per Index Attached'
  |'As Per Budget'
  ;
export interface Coordinator {
  _id: string;
  coordinatorName: string | undefined;
}

export interface MainCategory {
  name: string;
  subcategory1: SubCategory1[];
}
export interface SubCategory1 {
  name: string;
  subcategory2: SubCategory2[];
}
export interface SubCategory2 {
  name: string;
  subcategory3: SubCategory3[];
}
export interface SubCategory3 {
  name: string;
  narration: string;
}
export interface Particulars {
  _id?: string;
  mainCategory: string;
  subCategory1: string;
  subCategory2: string;
  subCategory3: string;
  quantity: string;
  month: string;
  requestedAmount: string;
  narration: string;
  FR?:FR;

}

export interface Remark extends MongooseDocument {
  remark: string;
  createdBy: IWorker;
}
export interface CreatableRemark extends Creatable<Remark> {
  createdBy?: IWorker;
}
