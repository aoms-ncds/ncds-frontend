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
        name:string;
        subcategory2:SubCategory2[];
    }
    interface SubCategory2{
        name:string;
        subcategory3:SubCategory3[];
    }
    interface SubCategory3{
        name:string;
        subcategory4:SubCategory4[];
    }
    interface SubCategory4{
        name:string;
        narration:string;
    }
    interface Month{
        monthName:string;
    }
    interface Particulars{
        _id:string;
        FRmainCategory:string;
        FRsubCategory1:string;
        FRsubCategory2:string;
        FRsubCategory3:string;
        FRquantity:string;
        FRmonth:string;
        FRrequestedAmount:string;
        FRnarration:string;

    }


}
