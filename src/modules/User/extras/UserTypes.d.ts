import { Moment } from 'moment';

export { };

declare global {
    interface User extends MongooseDocument{
        firstName: string;
        lastName: string;
        dob: Moment;
        doj?: Moment;
        gender: Gender;
        age: number;
        maritalStatus?: MaritalStatus;
        phone: string;
        email:string;
        spouse?: User;

    }
    type Gender = 'Male' | 'Female' | 'Other';
    type MaritalStatus = 'Married' | 'Unmarried';

    interface LoginCredentials{
        email: string;
        password: string;
    }
    interface LoginResponse{
        token: string;
        user: User;
    }

    interface Address {
    buildingName?: string;
    streetAddress?: string;
    city ?: string;
    district ?: string;
    state?: string;
    country?: string;
    pincode?: string;
  }
}
