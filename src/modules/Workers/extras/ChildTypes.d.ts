import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';
export interface Child extends MongooseDocument{
    firstName: string;
    lastName: string;
    dateOfBirth: moment;
    childOf: IETWorker | null;
    childSupport: string;
    studying: boolean;
    classOfStudy: string;
    working:boolean;
    occupation: string;
    qualification:string;
}
export interface CreatableChild extends Creatable<Child>{
    dateOfBirth?: Moment;
    childOf?: IETWorker | null;
    childSupport?: string;
    studying?: boolean;
    classOfStudy?: string;
    working?:boolean;
    occupation?: string;
    qualification?:string;
}
