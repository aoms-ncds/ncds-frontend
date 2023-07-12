export default {};
declare global {
  interface Application extends MongooseDocument {
  name: string;
  reason: string;
  status: string;
  division?:Division;
  createdBy?:User;
  attachment:FileObject[];
  }
  type CreatableApplication = Creatable<Application>;

}
