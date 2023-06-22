import { Moment } from 'moment';
import  ITransactions  from '../../FR/extras/FRTypes';
import { Types } from 'mongoose';

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
    _id: Types.ObjectId;
    IROno: string;
    IRODate: Date;
    purpose: string;
    lastUpdateDate: Date;
    status: number;
    ReleaseAmount?:IReleaseAmount
  
  }
  
   interface IReleaseAmount {
    _id: Types.ObjectId;
    modeOfPayment: string;
    releaseAmount: number;
    transactionNumber: number;
    transferredAmount: number;
    transferredDate: Date;
    transferredBank: BankDetails;
    branchName:string;
    beneficiary:string;
  
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
