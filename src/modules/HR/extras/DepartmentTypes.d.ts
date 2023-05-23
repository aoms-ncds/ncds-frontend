import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';

export interface Department extends MongooseDocument {
    name: string;
}
export interface CreatableDepartment extends Creatable<Department> {
    inputValue?: string;
}
