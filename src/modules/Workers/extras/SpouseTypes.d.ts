import { Moment } from 'moment';
import { IWorker } from './WorkersTypes';
import { MongooseDocument, Creatable, Language } from '../../../extras/CommonTypes';

export interface Spouse extends MongooseDocument{
    firstName: string;
    lastName: string;
    email?:string;
    phone?:string;
    dateOfBirth?: Moment;
    spouseOf: IWorker;
    working?:boolean;
    occupation?: string;
    qualification?:string;
    knownLanguages:Language[];
    hasChildren?:boolean;

}
export interface CreatableSpouse extends Creatable<Spouse>{
    spouseOf?: IWorker;
}
