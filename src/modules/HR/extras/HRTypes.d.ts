import { Moment } from 'moment';

export {};
declare global{
    interface Staff{
    _id: string;
    name: string;
    dob: Moment;
    doj: Moment;
    designation: Position;
    department: Department;
    phone: string;
    email:string;
    spouseOfAnotherEmployee: string;
    idFormat: string;
}
 interface Department{
    inputValue?: string;
    _id?: string;
    name: string;
}
 interface Position{
    inputValue?: string;
    _id?: string;
    name: string;
}
}
