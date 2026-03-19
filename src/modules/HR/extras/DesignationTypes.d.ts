export default {};
declare global {
  interface IDesignation extends MongooseDocument {
    name: string;
  }

  interface CreatableDesignation extends Creatable<IDesignation> {
    inputValue?: string;
  }
}
