export { };

declare global {
    interface IETDivisions{
        _id: string;
        divisionName: string ;
        coordinator:Staff;
        numberofSubdivisions:number;
        numberofWorkers:number;
}
interface Subdivisions{
    _id:string;
    division:IETDivisions;
    subDivisionName:string;
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
    // subDivisionDetails?:Subdivisions ;
    bankDetails?: BankDetails;
}


}
