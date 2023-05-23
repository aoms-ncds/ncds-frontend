import { MongooseDocument } from '../../../extras/CommonTypes';
export interface SampleItem extends MongooseDocument {
  name: string;
  email: string;
}
