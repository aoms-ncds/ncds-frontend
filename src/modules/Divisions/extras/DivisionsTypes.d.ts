export { };

declare global {
    interface IETDivisions{
        _id: string;
        divisionName: string ;
        coordinator:Staff;
}
interface Subdivisions{
    _id:string;
    division:IETDivisions;
    subDivisionName:string;
}
}
