export default {};

declare global {
  interface Child extends MongooseDocument {
    firstName: string;
    lastName: string;
    dateOfBirth: Moment;
    childOf: IWorker | null;
    childSupport: string;
    studying: boolean;
    classOfStudy: string;
    working: boolean;
    occupation: string;
    qualification: string;
  }
  interface CreatableChild extends Creatable<Child> {
    dateOfBirth?: Moment;
    childOf?: IWorker | null;
    childSupport?: string;
    studying?: boolean;
    classOfStudy?: string;
    working?: boolean;
    occupation?: string;
    qualification?: string;
  }
}
