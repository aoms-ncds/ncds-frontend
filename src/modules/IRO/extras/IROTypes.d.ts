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
    requestAmount: number;
    lastUpdateDate: Moment;
    sanction: string;
    releaseAmount: number;
    transferredAmount: number;
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
    attachment:FileObject[];

  }
}
