import { Moment } from 'moment';

export default { };

declare global{
  // interface IROrder{
  //   _id:string;
  //   IROno:string;
  //   IRPdate:string;
  //   division:DivisionDetails;
  //   mainCategory: string;
  //   lastUpdateDate: Moment;
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
    lastUpdateDate: Moment;
    status: number;
    releaseAmount:IReleaseAmount;

  }

  export interface IReleaseAmount {
    _id: string;
    modeOfPayment?: string;
    releaseAmount?: number;
    transactionNumber?: string;
    transferredAmount?: number;
    transferredDate?: Moment|null;
    transferredBank: BankDetails;
    IRO?:string;
    attachment:FileObject[];

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
//     lastUpdateDate: Moment;

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
