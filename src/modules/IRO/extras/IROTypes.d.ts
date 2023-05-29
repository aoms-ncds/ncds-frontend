import { Moment } from 'moment';

export default {};

declare global{
   interface IROrder {
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
}
}
