export default {};


declare global {
 interface Division extends MongooseDocument {
    // _id: GridRowId;
    details: DivisionDetails;
    subDivisions: SubDivision[];
    FCRABankDetails: BankDetails;
    localBankDetails: BankDetails;
    _id?: string;
  }
interface DivisionDetails {
    name: string;
    // _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noofWorkers?: number;
    noOfSubdivisions?: number;
    noOfChurches?: number;
    coordinator?: Staff;
    seniorLeader?: Staff;
    juniorLeader?: Staff;
  }

   interface BankDetails {
    bankName: string;
    branchName: string;
    accountNumber: string;
    IFSCCode: string;
    beneficiary?: string;
  }

   interface SubDivision {
    _id?: string;
    division?: Division;
    name: string;
  }
}
