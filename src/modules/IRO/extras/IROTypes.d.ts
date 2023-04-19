import { Moment } from 'moment';

export { };

declare global {
    interface IROrder{
        _id: string;
        IROno: string;
        IROdate: Moment;
        divisionName: string;
        subdivisionName: string;
        mainCategory: string;
        requestAmount: string;
        lastUpdateDate: Moment;
        sanction:string;
        releaseAmount:string;
        transferredAmount:string;
        transferredDate:Moment;
        transferredBank:string;
        modeOfPayment:string;
        transactionNumber:string;
    }
}
