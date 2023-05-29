export default {};
declare global {
   interface Designation extends MongooseDocument {
    name: string;
  }

   interface CreatableDesignation extends Creatable<Designation> {
    inputValue?: string;
  }
}
