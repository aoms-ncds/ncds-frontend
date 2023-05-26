export default {};
declare global {
  interface IWorker extends User {
    spouse?: Spouse;
    workerCode: string;
  }
  interface CreatableIWorker extends CreatableUser {
    spouse?: CreatableSpouse;
    workerCode?: string;
  }
}
