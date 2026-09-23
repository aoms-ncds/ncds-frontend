<<<<<<< HEAD
import { Moment } from "moment";

export default {};
declare global {
  interface Application extends MongooseDocument {
  applicationCode: string;
  name: string;
  asset?: boolean;
  reason: string;
  reasonForDeactivation?: string;
  status: string;
  remark?: string;
  division?:Division;
  presidentSanction?:boolean;
  createdBy?:User;
  attachment:FileObject[];
  appliedFor?:string;
  workersName?:string;
  applicantName?:string;
  requestedAmount?:number;
  sanctionedAmount?:number;
  approvedDate?:Moment;
   validityDate?:string;
    presidentRemark?:string;
    coordinatorName?:string;
    presidentName?:string;
    presidentSignature?: FileObject;
    letterNumber?:string;
  }
  type CreatableApplication = Creatable<Application>;

}
=======
import { Moment } from "moment";

export default {};
declare global {
  interface Application extends MongooseDocument {
  applicationCode: string;
  name: string;
  reason: string;
  reasonForDeactivation?: string;
  status: string;
  remark?: string;
  division?:Division;
  presidentSanction?:boolean;
  createdBy?:User;
  attachment:FileObject[];
  appliedFor?:string;
  workersName?:string;
  applicantName?:string;
  requestedAmount?:number;
  sanctionedAmount?:number;
  approvedDate?:Moment;
   validityDate?:string;
    presidentRemark?:string;
    coordinatorName?:string;
    presidentName?:string;
    presidentSignature?: FileObject;
    letterNumber?:string;
  }
  type CreatableApplication = Creatable<Application>;

}
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
