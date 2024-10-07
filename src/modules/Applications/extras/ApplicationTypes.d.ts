export default {};
declare global {
  interface Application extends MongooseDocument {
  applicationCode: string;
  name: string;
  reason: string;
  status: string;
  division?:Division;
  presidentSanction?:boolean;
  createdBy?:User;
  attachment:FileObject[];
  }
  type CreatableApplication = Creatable<Application>;

}
