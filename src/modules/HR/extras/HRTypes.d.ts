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
  interface CreatableDepartment extends Creatable<Department> {
    inputValue?: string;
  }
  interface Designation extends MongooseDocument {
    name: string;
  }

  interface CreatableDesignation extends Creatable<Designation>{
    inputValue?: string;
  }
}
