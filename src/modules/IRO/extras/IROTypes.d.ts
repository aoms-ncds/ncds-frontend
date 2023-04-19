export { };

declare global {
    interface IROrder{
        _id: string;
        IROno: string;
        IROdate: Date;
        divisionName: string;
        subdivisionName: string;
        mainCategory: string;
        requestAmount: string;
        lastUpdateDate: Date;
        sanction:string;
    }
}
