export { };

declare global {
 interface Department{
    inputValue?: string;
    _id?: string;
    name: string;
}
 interface Designation{
    inputValue?: string;
    _id?: string;
    name: string;
}
interface DivisionProfile{
    divisionName:string;
    _id:string;
    divisionId:string;
    contactNumber:string;
    emailId:string;
    address:string;
    noofWorkers:number;
    NoOfSubdivisions:number;
    NoOfChurches:number;
    coordinatorName:string;
    coordinatorContactno:string;
    coordinatorEmail:string;
    seniorLeaderName:string;
    seiorLeaderContactno:string;
    seiorLeaderEmail:string;
    juniorLeaderName:string;
   juniorLeaderContactno:string;
    juniorLeaderEmail:string;


}
interface BankDetails{
  FCRABankname:string;
  FCRABranchname:string;
  FCRAAccountNumber:string;
  FCRAIFSCCode:string;
  FCRABeneficiary:string;
  localBankname:string;
  localBranchname:string;
  localAccountNumber:string;
  localIFSCCode:string;
  localBeneficiary:string;

}
interface DivisionDetails{
    divisionProfile?: DivisionProfile;
    subDivisionDetails?:SubDivision[];
    bankDetails?: BankDetails;
}
interface SubDivision {
    _id:string;
    // division:IETDivisions;
     subDivisionName:string;
  }


}
