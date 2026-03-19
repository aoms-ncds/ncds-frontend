export default {};

declare global {
  interface SampleItem extends MongooseDocument {
    name: string;
    email: string;
  }
}
