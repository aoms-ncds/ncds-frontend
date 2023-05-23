import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';

export interface Application extends MongooseDocument {
  name: string;
  reason: string;
  status: string;
}
export type CreatableApplication = Creatable<Application>;
