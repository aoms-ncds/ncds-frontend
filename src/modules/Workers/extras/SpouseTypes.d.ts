import { Moment } from 'moment';
import { IWorker } from './WorkersTypes';

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

}
export interface CreatableSpouse extends Creatable<Spouse>{
    spouseOf?: IWorker;
}
