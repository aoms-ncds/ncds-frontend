export { };

declare global {
interface IETDivisions{
    divisionName: string;
   // _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noofWorkers?: number;
    noOfSubdivisions?: number;
    noOfChurches?: number;
    coordinator?: User;
    seniorLeader?: User;
    juniorLeader?: User;
  }
interface BankDetails{
  bankname:string;
  branchname:string;
  accountNumber:string;
  IFSCCode:string;
  beneficiary?:string;
  }
interface DivisionDetails extends MongooseDocument{
 // _id: GridRowId;
  division: IETDivisions;
  subDivisions: SubDivision[];
  FCRABankDetails: BankDetails;
  localBankDetails:BankDetails;
  _id?: string;
}
interface SubDivision {
    _id?:string;
    division?:IETDivisions;
    subDivisionName:string;
  }


}
