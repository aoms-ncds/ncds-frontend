import { Moment } from 'moment';

export {};
declare global {
  interface Department extends MongooseDocument {
    name: string;
  }
  interface CreatableDepartment extends Creatable<Department> {
    inputValue?: string;
  }
  interface Designation extends MongooseDocument {
    name: string;
  }

  interface CreatableDesignation extends Creatable<Designation> {
    inputValue?: string;
  }
}
