import { Moment } from 'moment';

export { };

declare global {
    interface Frrequest{
        _id: string;
        FRno: string;
        FRdate: Moment;
        divisionName: string;
        subdivisionName: string;
        mainCategory: string;
        requestAmount: string;
        lastUpdateDate: Moment;
        sanction:string;
    }
    interface Requisition{
        _id: string;
        RequisitionName: string | undefined;
    }
    interface Coordinator{
        _id: string;
        coordinatorName: string | undefined;
    }
    interface IETWorker{
        _id: string;
        workerName: string |undefined ;
        workerCode: string |undefined;
    }
    interface IETDivisions{
        _id: string;
        divisionName: string ;

    }
    interface Subdivisions{
        _id:string;
        divisionId:string;
        subDivisionName:string;
    }

    interface MainCategory{
        _id:string;
        mainCategoryName:string;
    }


}
