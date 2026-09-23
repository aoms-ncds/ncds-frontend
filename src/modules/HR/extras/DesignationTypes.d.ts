<<<<<<< HEAD
export default {};
declare global {
  interface IDesignation extends MongooseDocument {
    name: string;
  }

  interface CreatableDesignation extends Creatable<IDesignation> {
    inputValue?: string;
  }
}
=======
export default {};
declare global {
  interface IDesignation extends MongooseDocument {
    name: string;
  }

  interface CreatableDesignation extends Creatable<IDesignation> {
    inputValue?: string;
  }
}
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
