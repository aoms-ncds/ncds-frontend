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
interface Staff{
    _id: string;
    name: string;
    dob: string;
    doj: string;
    designation: Position;
    department: Department;
    phone: string;
    email:string;
    spouseOfAnotherEmployee: string;
    idFormat: string;
}
 interface Department{
    inputValue?: string;
    _id?: string;
    name: string;
}
 interface Position{
    inputValue?: string;
    _id?: string;
    name: string;
}


}
