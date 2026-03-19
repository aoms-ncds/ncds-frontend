import { Moment } from 'moment';

export default {};

declare global {
   interface ILog{
    _id:string;
    user: User;
    createdAt:Moment;
    updatedAt:Moment;
    // loginAt: Moment;
}
}
