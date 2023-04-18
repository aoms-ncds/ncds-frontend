export { };

declare global {
    interface Frrequest{
        _id: string;
        FRno: string;
        FRdate: Date;
        divisionName: string;
        subdivisionName: string;
        mainCategory: string;
        requestAmount: string;
        lastUpdateDate: Date;
        sanction:string;
    }
    interface Requisition{
        _id: string;
        RequisitionName: string;
    }

}
