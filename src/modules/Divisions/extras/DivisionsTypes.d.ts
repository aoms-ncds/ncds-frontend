import { MongooseDocument, Creatable, Address } from '../../../extras/CommonTypes';
import { Staff } from '../../HR/extras/StaffTypes';

export interface Division extends MongooseDocument{
  // _id: GridRowId;
   details: DivisionDetails;
   subDivisions: SubDivision[];
   FCRABankDetails: BankDetails;
   localBankDetails:BankDetails;
   _id?: string;
 }
export interface DivisionDetails{
    name: string;
   // _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noofWorkers?: number;
    noOfSubdivisions?: number;
    noOfChurches?: number;
    coordinator?:Staff;
    seniorLeader?: Staff;
    juniorLeader?: Staff;
  }
export interface BankDetails{
  bankName:string;
  branchName:string;
  accountNumber:string;
  IFSCCode:string;
  beneficiary?:string;
  }
export interface SubDivision {
    _id?:string;
    division?:Division;
    name:string;
  }
