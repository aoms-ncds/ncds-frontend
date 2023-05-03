import { Moment } from 'moment';

export {};
declare global {
  interface Staff extends MongooseDocument {
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
  interface CreatableStaff extends Creatable<Staff>{
    dob?: Moment;
    doj?: Moment;
    designation?: Designation;
    department?: Department;
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
