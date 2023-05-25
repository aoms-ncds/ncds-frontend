import { CreatableSpouse, Spouse } from './SpouseTypes';
import { CreatableUser, User } from '../../User/extras/UserTypes';

export interface IWorker extends User{
    spouse?: Spouse;
    workerCode: string;
}
export interface CreatableIWorker extends CreatableUser{
    spouse?: CreatableSpouse;
    workerCode?: string;
}
