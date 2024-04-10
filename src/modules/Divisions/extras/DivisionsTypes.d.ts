export default {};

declare global {
  interface Division extends MongooseDocument {
    // _id: GridRowId;
    details: DivisionDetails;
    subDivisions: SubDivision[];
    FCRABankDetails: BankDetails;
    localBankDetails: BankDetails;
    otherBankDetails: BankDetails;
    otherBankDetails1: BankDetails;
    otherBankDetails2: BankDetails;
    otherBankDetails3: BankDetails;
    otherBankDetails4: BankDetails;
    _id: string;
  }
  interface DivisionDetails {
    name: string;
    // _id?: string;
    divisionId: string;
    contactNumber: string;
    email: string;
    address: Address;
    noOfWorkers?: number;
    noOfSubdivisions?: number;
    noOfChurches?: number;
    // coordinator?: Staff;
    // seniorLeader?: Staff;
    // juniorLeader?: Staff;
    // attachment:FileObject[];
    coordinator?:{

      name?:User;
      sign?:FileObject;
    };
    seniorLeader:{

      name?:User;
      sign?:FileObject;
    };
    juniorLeader:{

      name?:User;
      sign?:FileObject;
    };
    president?:{
      name?:User;
      sign?:FileObject;
    };
    officeManager?:{
      name?:User;
      sign?:FileObject;
    };
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
    leader?: User;
  }
}
