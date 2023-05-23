import { CreatableSpouse, Spouse } from './SpouseTypes';
import { CreatableNewUser, User } from '../../User/extras/UserTypes';

export interface IWorker extends User{
    spouse: Spouse;
    workerCode: string;
}
export interface CreatableIWorker extends CreatableNewUser{
    spouse: CreatableSpouse;
    workerCode?: string;
}
