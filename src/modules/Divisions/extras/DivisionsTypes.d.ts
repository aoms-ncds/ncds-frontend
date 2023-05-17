export { };

declare global {
interface IETDivisions extends MongooseDocument{
    divisionName: string;
    _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noofWorkers: number;
    noOfSubdivisions: number;
    noOfChurches: number;
    coordinator: Staff;
    seniorLeader: Staff;
    juniorLeader: Staff;
  }
interface BankDetails{
  bankname:string;
  branchname:string;
  accountNumber:string;
  IFSCCode:string;
  beneficiary?:string;
  }
interface DivisionDetails extends MongooseDocument{
  division: IETDivisions;
  subDivisions: SubDivision[];
  FCRABankDetails: BankDetails;
  localBankDetails:BankDetails;
}
interface SubDivision {
    _id:string;
    division?:IETDivisions;
    subDivisionName:string;
  }


}
