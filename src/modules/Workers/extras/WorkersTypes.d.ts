import { Moment } from 'moment';

export { };

declare global {
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


 }
