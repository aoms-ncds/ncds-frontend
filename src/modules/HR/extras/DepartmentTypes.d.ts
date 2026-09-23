<<<<<<< HEAD
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
=======
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
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
