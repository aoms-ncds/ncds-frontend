import { Moment } from 'moment';
import { ExitStatus } from 'typescript';
import { reasonToDeactivate, status } from '../extras/WorkersConfig';
export { };

declare global {
    interface Child extends MongooseDocument{
        type:string;
        firstName: string;
        lastName: string;
        dob: moment;
        childOf: User | null;
        childSupport: string;
        studying: boolean;
        classOfStudy: string;
        working:boolean;
        occupation: string;
        qualification:string;


    }
    interface CreatableChild extends Creatable<Child>{
        dob?: Moment;
        childOf?: User | null;
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
    spouseOf: User;
    working:boolean;
    occupation: string;
    qualification:string;
    languagesKnown:Languages[];

}
interface CreatableSpouse extends Creatable<Spouse>{
    dob?: moment;
    spouseOf?: User | null;
    working?:boolean;
    occupation?: string;
    qualification?:string;
    languagesKnown?:Languages[];
}


}
