export default {};
declare global {
  interface Application extends MongooseDocument {
  name: string;
  reason: string;
  status: string;
  attachment:FileObject[];
  }
  type CreatableApplication = Creatable<Application>;
}
