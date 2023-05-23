import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';

export interface Designation extends MongooseDocument {
  name: string;
}

export interface CreatableDesignation extends Creatable<Designation> {
  inputValue?: string;
}
