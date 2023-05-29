import { Moment } from 'moment';
import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';
import { IWorker } from './WorkersTypes';
export interface Child extends MongooseDocument{
    firstName: string;
    lastName: string;
    dateOfBirth: Moment;
    childOf: IWorker | null;
    childSupport: string;
    studying: boolean;
    classOfStudy: string;
    working:boolean;
    occupation: string;
    qualification:string;
}
export interface CreatableChild extends Creatable<Child>{
    dateOfBirth?: Moment;
    childOf?: IWorker | null;
    childSupport?: string;
    studying?: boolean;
    classOfStudy?: string;
    working?:boolean;
    occupation?: string;
    qualification?:string;
}
