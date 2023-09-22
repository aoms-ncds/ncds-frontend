import { Moment } from 'moment';

export default {};

declare global {
  interface FR extends ITransactions {
    _id: string;
    FRno: string;
    FRdate: Moment;
    // requestAmount: string;
    sanction: string;
    purpose: FRPurpose;
    IRO?:string;
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
    division?: FR['division'];
    purposeCoordinator?: FR['purposeCoordinator'];
    sanctionedAsPer?: FR['sanctionedAsPer'];
    sanctionedBank?: FR['sanctionedBank'];
    status?: number;
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
    subcategory1: {
      name: string;
      subcategory2: {
        name: string;
        subcategory3: {
          name: string;
          narration: string;
        }[];}[];
    }[];
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
    purposeWorker?: IWorker | Staff;
    purposeSubdivision?: SubDivision;
    division?: Division;
    purposeCoordinator?: User;
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
