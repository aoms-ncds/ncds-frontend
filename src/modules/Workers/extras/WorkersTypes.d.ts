import { Moment } from 'moment';
import { ExitStatus } from 'typescript';
import { reasonToDeactivate, status } from '../extras/WorkersConfig';
export { };

declare global {
    interface WorkersDetails{
        IETWorker: IETWorker;
        officialDetails: OfficialDetails;
        supportDetails?: SupportDetails;
        supportStructure?: SupportStructure;
    }

    interface OfficialDetails{
        leftOrg: Moment;
        noOfYrsInOrg: number; // autoFetch using doj and leftOrg
        reasonToDeactivate: reasonToDeactivate;
        remarks: string;
        subDivision: Subdivisions;
        status: status;
        joinedDivOn: Moment;
        leftDivOn: Moment;
        residingAddress: Address;
        noOfChurches: number;
    }

    type TypeOfFamily = 'Single Missionary' | 'Family Missionary'
    type TypeOfChurch = 'With Church' | 'Without Church'


    interface SupportDetails{
        currentDesignation?: Designation;
        totalNoYearsInMinistry: number;
        typeOfFamily: TypeOfFamily;
        typeofChurch:TypeOfChurch;
        selfSupport: boolean;
    }
    interface SupportStructure{
        basicAllowance: number;
        hraAllowance: number;
        spouseAllowance: number;
        positionalAllowance:number;
        specialAllowance: number;
        impactDeduction: number;
        telAllowance: number;
        pionMissionaryFund: number;
        MUTDeduction: number;
    }
    interface Child extends MongooseDocument{
        type:string;
        firstName: string;
        lastName: string;
        dob: moment;
        childOf: IETWorker | null;
        childSupport: string;
        studying: boolean;
        classOfStudy: string;
        working:boolean;
        occupation: string;
        qualification:string;


    }
    interface CreatableChild extends Creatable<Child>{
        dob?: Moment;
        childOf?: IETWorker | null;
        childSupport?: string;
        studying?: boolean;
        classOfStudy?: string;
        working?:boolean;
        occupation?: string;
        qualification?:string;
}
interface Spouse extends MongooseDocument{
    firstName: string;
    lastName: string;
    email:string;
    mobileNo:string;
    dob: moment;
    spouseOf: IETWorker;
    working:boolean;
    occupation: string;
    qualification:string;
    languagesKnown:LanguagesList[];

}
interface CreatableSpouse extends Creatable<Spouse>{
    dob?: moment;
    spouseOf?: IETWorker | null;
    working?:boolean;
    occupation?: string;
    qualification?:string;
    languagesKnown?:LanguagesList[];
}


}
