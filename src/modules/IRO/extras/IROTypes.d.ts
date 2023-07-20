import { Moment } from 'moment';

export default { };

declare global{
  // interface IROrder{
  //   _id:string;
  //   IROno:string;
  //   IRPdate:string;
  //   division:DivisionDetails;
  //   mainCategory: string;
  //   Particulars:Particular[];
  //   ReleaseAmount?:IReleaseAmount
  //   sanctionedAmount: number;
  //   SubDivision:SubDivision
  // }
  export interface IROrder extends ITransactions {
    _id: string;
    IROno: string;
    IRODate: Moment;
    purpose: string;
    status: number;
    releaseAmount:IReleaseAmount;
    billAttachment:FileObject[];
    signature:{
      hrSignature?:FileObject;
      accountManagerSignature?:FileObject;
      accountantSignature?:FileObject;
      divisionCoordinatorSignature?:FileObject;

    };
  }

  export interface IReleaseAmount {
    _id: string;
    modeOfPayment?: string;
    releaseAmount?: number;
    transactionNumber?: string;
    transferredAmount?: number;
    transferredDate?: Moment|null;
    transferredBank: BankDetails;
    IRO?:IROrder[];
    attachment:FileObject[];
    division:string;

  }
}

// declare global {
//   interface IROrder {
//     sanctionedAmount: IROrder | undefined;
//     map(arg0: (order: any) => void): unknown;
//     _id: string;
//     IROno: string;
//     IROdate: Moment;
//     division: Division;
//     subDivision: SubDivision;
//     mainCategory: string;
//     requestAmount: number;

//     sanction: string;
//     releaseAmount: number;
//     transferredAmount: number;
//     transferredDate: Moment;
//     transferredBank: BankDetails;
//     modeOfPayment: string;
//     transactionNumber: string;
//     bankName: string;
//     branchName: string;
//     accountNumber: string;
//     IFSCCode: string;
//     beneficiary: string;
//     remark:string;
//     attachment:FileObject[];

//   }
// }
