
export default { };

declare global{

interface Esignature{
    _id:string;
    officeManagerSignature?:FileObject;
    prevOfficeManagerSignature?:FileObject;
    officeManagerName?:FileObject;
}
interface EsignaturePresident{
    _id:string;
    presidentSignature?:FileObject;
    presidentName?:any;
}
}
