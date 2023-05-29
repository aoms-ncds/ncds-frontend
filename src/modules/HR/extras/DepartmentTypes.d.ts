export default {};

declare global {
  interface Department extends MongooseDocument {
    name: string;
  }
  interface CreatableDepartment extends Creatable<Department> {
    inputValue?: string;
  }
}
