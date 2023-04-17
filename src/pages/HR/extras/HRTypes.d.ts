export {};
declare global{
type Staff={
    _id: string;
    name: string;
    dob: string;
    doj: string;
    designation: string;
    department: string;
    phone: string;
    email:string
    spouseOfAnotherEmployee: string;
    idFormat: string;
}
type Department={
    _id: string;
    name: string;
}
type Position={
    _id: string;
    name: string;
}
}
