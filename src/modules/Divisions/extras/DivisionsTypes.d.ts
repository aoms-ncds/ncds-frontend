import { MongooseDocument, Creatable } from '../../../extras/CommonTypes';

export interface IETDivisions{
    divisionName: string;
   // _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noofWorkers?: number;
    noOfSubdivisions?: number;
    noOfChurches?: number;
    coordinator?: IWorker;
    seniorLeader?: IWorker;
    juniorLeader?: IWorker;
  }
export interface BankDetails{
  bankname:string;
  branchname:string;
  accountNumber:string;
  IFSCCode:string;
  beneficiary?:string;
  }
export interface DivisionDetails extends MongooseDocument{
 // _id: GridRowId;
  division: IETDivisions;
  subDivisions: SubDivision[];
  FCRABankDetails: BankDetails;
  localBankDetails:BankDetails;
  _id?: string;
}
export interface SubDivision {
    _id?:string;
    division?:DivisionDetails;
    name:string;
  }
