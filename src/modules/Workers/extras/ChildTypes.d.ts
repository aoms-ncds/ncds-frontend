import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';
export interface Child extends MongooseDocument{
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
export interface CreatableChild extends Creatable<Child>{
    dob?: Moment;
    childOf?: IETWorker | null;
    childSupport?: string;
    studying?: boolean;
    classOfStudy?: string;
    working?:boolean;
    occupation?: string;
    qualification?:string;
}
