import { Moment } from 'moment';

export default {};

declare global {
  interface Division extends MongooseDocument {
    // _id: GridRowId;
    details: DivisionDetails;
    subDivisions: SubDivision[];
    DivisionBankFCRA: BankDetails;
    DivisionBankLocal: BankDetails;
    BeneficiaryBank1: BankDetails;
    BeneficiaryBank2: BankDetails;
    BeneficiaryBank3: BankDetails;
    BeneficiaryBank4: BankDetails;
    BeneficiaryBank5: BankDetails;
    BeneficiaryBank6: BankDetails;
    BeneficiaryBank7: BankDetails;
    BeneficiaryBank8: BankDetails;
    BeneficiaryBank9: BankDetails;
    BeneficiaryBank10: BankDetails;
    BeneficiaryBank11: BankDetails;
    BeneficiaryBank12: BankDetails;
    BeneficiaryBank13: BankDetails;
    BeneficiaryBank14: BankDetails;
    BeneficiaryBank15: BankDetails;
    BeneficiaryBank16: BankDetails;
    BeneficiaryBank17: BankDetails;
    BeneficiaryBank18: BankDetails;
    BeneficiaryBank19: BankDetails;
    BeneficiaryBank20: BankDetails;
    FCRABankDetails?: BankDetails;
    localBankDetails?: BankDetails;
    otherBankDetails?: BankDetails;
    otherBankDetails1?: BankDetails;
    otherBankDetails2?: BankDetails;
    otherBankDetails3?: BankDetails;
    otherBankDetails4?: BankDetails;
    _id: string;
  }
  interface DivisionDetails {
    name: string;
    isIT?: boolean;

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
    prevCoordinator?:{
      name?:string;
      sign?:FileObject;
    };
    prevJuniorLeader1?:{

      name?:string;
      sign?:FileObject;
    };
    prevJuniorLeader2?:{

      name?:string;
      sign?:FileObject;
    };
    additionalJuniorLeader?:{

      name?:User|null;
      sign?:FileObject;
    };
    additionalSeniorLeader?:{

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
    isIT?: boolean;
    leader?: User;
  }
   interface IDivisionUpdateLog extends Document{
  divName:string;
  divId:string;
  field:string;
  doneBy:User;
  createdAt:Moment;
  }
}
