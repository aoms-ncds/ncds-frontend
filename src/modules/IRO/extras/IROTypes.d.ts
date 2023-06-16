import { Moment } from 'moment';

export default {};

declare global {
  interface IROrder {
    map(arg0: (order: any) => void): unknown;
    _id: string;
    IROno: string;
    IROdate: Moment;
    division: Division;
    subDivision: SubDivision;
    mainCategory: string;
    requestAmount: string;
    lastUpdateDate: Moment;
    sanction: string;
    releaseAmount: string;
    transferredAmount: string;
    transferredDate: Moment;
    transferredBank: BankDetails;
    modeOfPayment: string;
    transactionNumber: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    IFSCCode: string;
    beneficiary: string;
    remark:string;
  }
}
