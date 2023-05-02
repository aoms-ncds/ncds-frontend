import { Moment } from 'moment';

export { };

declare global {
    interface WorkersDetails{
        basicDetails?: BasicDetails;
        officialDetails?: OfficialDetails;
        supportDetails?: SupportDetails;
        supportStructure?: SupportStructure;
    }
    interface BasicDetails{
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

    interface OfficialDetails{
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
    interface SupportDetails{
        _id : string;
        currentDesignation?: Designation;
        totalNoYearsInMinistry: number;
        typeOfFamily: string;
        typeofChurch:string;
        selfSupport: string;
    }
    interface SupportStructure{
        _id : string;
        basicAllowance: string;
        hraAllowance: number;
        spouseAllowance: string;
        positionalAllowance:string;
        specialAllowance: string;
        impactDeduction: string;
        telAllowance: string;
        pionMissionaryFund: string;
        MUTDeduction: string;
    }


 }
