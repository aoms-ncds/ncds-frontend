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
    interface WorkersRequest{
        _id : string;
        workerCode: string;
        firstName: string;
        secondName: string;
        missionaryOrNonMissionary:string;
        dob: Moment;
        gender: string;
        age: string;
        maritalStatus: string;
        highestQualification:string;
        motherToungue:string;
        communicationLanguage:string;
        languagesKnown:string;
        emailId:string;
        mobileNumber:string;
        alternativeMobileNumber:string;
        PANnumber:string;
        aadhaarNumber:string;
        voterId:string;
        licenseNumber:string;
        permanentAddress:string;
        permanentAddressCity:string;
        permanentAddressDistrict:string;
        permanentAddressState:string;
        permanentAddressCountry:string;
        permanentAddressPincode:string;
        currentAddress:string;
        currentAddressCity:string;
        currentAddressDistrict:string;
        currentAddressState:string;
        currentAddressCountry:string;
        currentAddressPincode:string;
        spouseOfAnotherStaff:string;

    }
    interface IETDivisions{
        divisionName:string;
    _id:string;
    divisionId:string;
    contactNumber:string;
    emailId:string;
    address:string;
    noofWorkers:number;
    NoOfSubdivisions:number;
    NoOfChurches:number;
    coordinatorName:string;
    coordinatorContactno:string;
    coordinatorEmail:string;
    seniorLeaderName:string;
    seiorLeaderContactno:string;
    seiorLeaderEmail:string;
    juniorLeaderName:string;
   juniorLeaderContactno:string;
    juniorLeaderEmail:string;

    }
    interface Subdivisions{
        _id:string;
       // division:IETDivisions;
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
        FRrequestedAmount:number;
        FRnarration:string;

    }


}
