import { Moment } from 'moment';

export default {};

declare global{
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
    Particulars:Particulars[];
  }
  interface FR extends MongooseDocument {
    _id: string;
    FRno: string;
    FRdate: Moment | undefined;
    purpose: FRPurpose;
    purposeWorker?: IWorker;
    purposeSubdivision?: SubDivision;
    purposeDivision?: Divisions;
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
  interface CreatableFR extends Creatable<FR> {
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

  type SanctionedAsPer =
    | 'As per sanction by Manager'
    | 'As per policy'
    | 'As Per List Attached'
    | 'As Per Ticket Attached'
    | 'As Per Bill Attached'
    |'As per Index Attached'
    |'As Per Budget'
    ;
  interface Coordinator {
    _id: string;
    coordinatorName: string | undefined;
  }

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
      purposeWorker?: IWorker;
      purposeSubdivision?: SubDivision;
      purposeDivision?: Division;
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
    //  interface FRPurpose{
    //     _id: string;
    //     name: string;
    // }
    type FRPurpose = 'Worker' | 'Subdivision' | 'Division' | 'Coordinator' | 'Others';
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
      createdBy: IWorker;
    }
    interface CreatableRemark extends Creatable<Remark> {
      createdBy?: IWorker;
    }
  }

}
