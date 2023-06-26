import { Moment } from 'moment';
import { Types } from 'mongoose';

export default {};

declare global {
  interface FR extends ITransactions {
    _id: string;
    FRno: string;
    FRdate: Moment;
    // requestAmount: string;
    lastUpdateDate: Moment;
    sanction: string;
    particulars:Particular[];
    purpose: FRPurpose;
  }

  interface CreatableFR extends Creatable<FR> {
    _id?:string;
    FRdate?: Moment;
    FRno?: FR['FRno'];
    lastUpdatedDate?: Moment;
    purpose?: FR['purpose'];
    sanction?: FR['sanction'];
    requestAmount?: ['requestedAmount'];
    sanctionedAmount?: FR['sanctionedAmount'];
    mainCategory?: FR['mainCategory'];
    purposeWorker?: FR['purposeWorker'];
    purposeSubdivision?: FR['purposeSubdivision'];
    purposeDivision?: FR['purposeDivision'];
    purposeCoordinator?: FR['purposeCoordinator'];
    sanctionedAsPer?: FR['sanctionedAsPer'];
    sanctionedBank?: FR['sanctionedBank'];
    status?: string;
    purposeOthers?: string; // Added missing property
    createdBy?: IWorker; // Added missing property
    particulars?: Particular[]; // Added missing property
  }
  type FRPurpose = 'Worker' | 'Subdivision' | 'Division' | 'Coordinator' | 'Others';


  type SanctionedAsPer = 'As per sanction by Manager' | 'As per policy' | 'As Per List Attached' | 'As Per Ticket Attached' | 'As Per Bill Attached' | 'As per Index Attached' | 'As Per Budget';
  interface Coordinator {
    _id: string;
    coordinatorName: string | undefined;
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
  interface Particular {
    _id: string;
    mainCategory: string;
    subCategory1: string;
    subCategory2: string;
    subCategory3: string;
    quantity?: number;
    month: string;
    unitPrice?: number;
    requestedAmount?: number;
    narration: string;
    attachment: FileObject[];
  }
  type CreatableParticular = Creatable<Particular>;

  interface Remark extends MongooseDocument {
    remark: string;
    createdBy: IWorker;
    transactionId: string;
  }
  interface CreatableRemark extends Creatable<Remark> {
    createdBy?: IWorker;
    transactionId: string;
  }

  export interface ITransactions extends MongooseDocument {
    kind: 'FRs' | 'IRO';
    purposeWorker?: IWorker;
    purposeSubdivision?: SubDivision;
    purposeDivision?: Division;
    purposeCoordinator?: IWorker;
    purposeOthers?: string;
    sanctionedAmount: number;
    status: number;
    sanctionedAsPer: string;
    sanctionedBank: string;
    mainCategory: string;
    createdBy: IWorker;
    particulars: Particular[];
  }
}
