import { Moment } from 'moment';

export {};
declare global {
  interface Staff extends MongooseDocument, User {
    designation: Designation;
    department: Department;
    formattedId: string;
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

  interface CreatableDesignation extends Creatable<Designation>{
    inputValue?: string;
  }

  interface CreatableDesignation extends Creatable<Designation>{
    inputValue?: string;
  }
}
