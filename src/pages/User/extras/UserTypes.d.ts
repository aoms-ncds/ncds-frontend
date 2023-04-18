import { Moment } from 'moment';

export { };

declare global {
    interface User{
        _id: string;
        firstName: string;
        lastName: string;
        dob: Moment;
        doj: Moment;
        designation: Position;
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
