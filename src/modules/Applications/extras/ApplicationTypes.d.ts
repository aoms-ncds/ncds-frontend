export default {};
declare global {
  interface Application extends MongooseDocument {
  name: string;
  reason: string;
  status: string;
  createdBy?:User;
  attachment:FileObject[];
  }
  type CreatableApplication = Creatable<Application>;

}
