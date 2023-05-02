import { Moment } from 'moment';

export { };

declare global {
    interface User extends MongooseDocument{
        firstName: string;
        lastName: string;
        dob: Moment;
        doj: Moment;
        designation: Designation;
        department: Department;
        phone: string;
        email:string;
        spouseOfAnotherEmployee: string;
        idFormat: string;
    }

    interface LoginCredentials{
        email: string;
        password: string;
    }
    interface LoginResponse{
        token: string;
        user: User;
    }
}
