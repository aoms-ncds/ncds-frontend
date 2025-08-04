


interface ILeaderDetails extends MongooseDocument{
    _id:string;
    name?:string;
    order?:number;
}

type CreatableLeaderDetails = Creatable<ILeaderDetails>;
