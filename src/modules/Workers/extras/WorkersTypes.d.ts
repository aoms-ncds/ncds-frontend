import { Moment } from 'moment';
import { CreatableSpouse, Spouse } from './SpouseTypes';

export interface IWorker extends User{
    spouse: Spouse;
    workerCode: string;
}
export interface CreatableIWorker extends CreatableNewUser{
    spouse: CreatableSpouse;
    workerCode: string;
}
