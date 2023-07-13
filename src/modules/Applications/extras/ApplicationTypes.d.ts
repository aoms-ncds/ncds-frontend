export default {};
declare global {
  interface Application extends MongooseDocument {
  applicationNo: string;
  name: string;
  reason: string;
  status: string;
  division?:Division;
  createdBy?:User;
  attachment:FileObject[];
  }
  type CreatableApplication = Creatable<Application>;

}
