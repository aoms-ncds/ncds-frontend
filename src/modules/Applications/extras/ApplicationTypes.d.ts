export default {};
declare global {
  interface Application extends MongooseDocument {
  name: string;
  reason: string;
  status: string;


  }
  type CreatableApplication = Creatable<Application>;
}
