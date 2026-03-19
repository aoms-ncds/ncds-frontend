export default {};

declare global {
  interface Department extends MongooseDocument {
    name: string;
    status: number;
  }
  interface CreatableDepartment extends Creatable<Department> {
    inputValue?: string;
  }
}
