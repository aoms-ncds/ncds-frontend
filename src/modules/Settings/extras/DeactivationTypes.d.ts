<<<<<<< HEAD


interface IReason extends MongooseDocument{
    _id:string;
    reason?:string;
}

type CreatableReason = Creatable<IReason>;


interface ISanctionedAsPer extends MongooseDocument{
    _id:string;
    asPer?:string;
}

type CreatableSanctionedAsPer = Creatable<ISanctionedAsPer>;
=======


interface IReason extends MongooseDocument{
    _id:string;
    reason?:string;
}

type CreatableReason = Creatable<IReason>;


interface ISanctionedAsPer extends MongooseDocument{
    _id:string;
    asPer?:string;
}

type CreatableSanctionedAsPer = Creatable<ISanctionedAsPer>;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
