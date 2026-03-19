import moment, { Moment } from 'moment';

export default {};

declare global {
  interface FR extends ITransactions {
    _id: string;
    FRno: string;
    FRdate: Moment;
    // requestAmount: string;
    disable?:boolean;
    IRO?: string;
    reasonForSentBack?:string;
    reasonForReject?:string;
    designationParticular?:string;
    signature?: {
      coordinator?: FileObject;
      jrLeader?: FileObject;
      srLeader?: FileObject;
      president?: FileObject;
    };
    names?: {
      coordinator?: IWorker;
      jrLeader?: IWorker;
      srLeader?: IWorker;
      president?: string;
    };
    signatureDelhiDiv?: {
      jrLeader?: FileObject;
      srLeader?: FileObject;
    };
  }

  interface CreatableFR extends Creatable<FR> {
    _id?: string;
    FRdate?: Moment;
    FRno?: FR['FRno'];
    lastUpdatedDate?: Moment;
    raisedBy?: string;
    purpose?: FR['purpose'];
    sanction?: FR['sanction'];
    requestAmount?: ['requestedAmount'];
    // sanctionedAmount?: FR['sanctionedAmount'];
    mainCategory?: FR['mainCategory'];
    purposeWorker?: FR['purposeWorker'];
    purposeSubdivision?: FR['purposeSubdivision'];
    division?: FR['division'];
    purposeCoordinator?: FR['purposeCoordinator'];
    // sanctionedAsPer?: FR['sanctionedAsPer'];
    specialsanction?: FR['specialsanction'];
    presidentApproveDate?: FR['presidentApproveDate'];
    sanctionedBank?: FR['sanctionedBank'];
    status?: number;
    purposeOthers?: string; // Added missing property
    createdBy?: IWorker; // Added missing property
    particulars?: Particular[]; // Added missing property
    reasonForSentBack?:string;
    reasonForReject?:string;
    sourceOfAccount?:string;
    additionalSignature?:FileObject;
    additionalDesignation?:string;
    additionalName?:string;
    disable?:boolean;
    releaseAmount?:string;
    transferredDate?:Moment;
    modeOfPayment?:string;
    beneficiaryName?:string;
    presidentRemarks?: string;
    Validity?: string;
    presidentSanctionedAmount?: string;
  }
  type FRPurpose = 'Worker' | 'Subdivision' | 'Division' | 'Coordinator' | 'Others';


  // type SanctionedAsPer = 'As per sanction by Manager' | 'As per policy' | 'As Per List Attached' | 'As Per Ticket Attached' | 'As Per Bill Attached' | 'As per Index Attached' | 'As Per Budget';
  type SanctionedAsPer = [];
  interface Coordinator {
    _id: string;
    coordinatorName: string | undefined;
  }
  interface MainCategory {
    _id?: string;
    name: string;
    subcategory1: SubCategory1[];
  }
  interface SubCategory1 {
    _id?:string;
    name: string;
    subcategory2: SubCategory2[];
  }
  interface SubCategory2 {
    _id?:string;
    name: string;
    subcategory3: SubCategory3[];
  }
  interface SubCategory3 {
    _id?:string;
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
    isUpcomingYear?:boolean;
    unitPrice?: number;
    requestedAmount?: number;
    narration: string;
    attachment: FileObject[];
    sanctionedAsPer?:string;
    sanctionedAmount?: number | null;
    year?: number | null;
    applicationReferenceNo?: string | null;
    presidentSanctionAmt?:number;
    applicationAttachment?:FileObject[];


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
    purposeSubdivision?: SubDivision | null;
    purpose: FRPurpose;
    division?: Division;
    purposeCoordinator?: User| null;
    purposeOthers?: string;
    sanctionedAmount?: number | null;
    sanctionedAmountTotal?: number;
    status: number;
    sanctionedAsPer: string | ISanctionedAsPer;
    specialsanction: string;
    presidentApproveDate?: Moment;
    sanctionedBank: string;
    mainCategory?: string;
    createdBy: IWorker;
    particulars: Particular[];
    groupIros?: [];
    workerSupport?:boolean;
    childSupport?:boolean;
    designationParticular?:string;
    sourceOfAccount?:string;
    additionalSignature?:FileObject;
    additionalDesignation?:string;
    additionalName?:string;
    signatureSheet?:string;
    frVerifiedOn?:Moment;
    iroVerifiedOn?:Moment;
    reconciliationOn?:Moment;
    iroClosedOn?:Moment;
    approvedBy?:string|IWorker;
    divisionCoordinator?:string;


  }

  export interface IDesignationParticular extends MongooseDocument{
    title?: string;
    mainCategory?: string;
    subCategory1?: string;
    subCategory2?: string;
    subCategory3?: string;
    designations?:string[];
  }
 export type CreatableDesignationParticular = Creatable<IDesignationParticular>;
 export interface ITransactionLog extends Document{
  TRNo:string;
  TRId:string;
  action:string;
  doneBy:User;
  type:'FR'|'IRO';
  createdAt:Moment;
  }

}
