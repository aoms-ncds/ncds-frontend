

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
