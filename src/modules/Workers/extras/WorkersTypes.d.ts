import { CreatableSpouse, Spouse } from './SpouseTypes';
import { CreatableUser, User } from '../../User/extras/UserTypes';
import { Child } from './ChildTypes';

export interface IWorker extends User{
    firstName: string;
    spouse?: Spouse;
    children?:Child[];
    workerCode: string;
}
export interface CreatableIWorker extends CreatableUser{
    spouse?: CreatableSpouse;
    children?:Child[];
    workerCode?: string;
}
