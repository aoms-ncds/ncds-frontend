import { Moment } from 'moment';

export {};
declare global {
  interface Staff {
    _id: string;
    name: string;
    dob: Moment;
    doj: Moment;
    designation: Designation;
    department: Department;
    phone: string;
    email: string;
    spouseOfAnotherEmployee: string;
    idFormat: string;
  }
  interface Department extends MongooseDocument {
    name: string;
  }
  interface CreatableDepartment extends Omit<Department, '_id'> {
    inputValue?: string;
    createdAt?: Moment;
    updatedAt?: Moment;
  }
  interface Designation extends MongooseDocument {
    name: string;
  }
  type CreatableDesignation = Creatable<Designation>;
}
