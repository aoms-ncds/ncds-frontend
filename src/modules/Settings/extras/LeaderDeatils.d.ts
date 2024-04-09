


interface ILeaderDetails extends MongooseDocument{
    _id:string;
    name?:string;
}

type CreatableLeaderDetails = Creatable<ILeaderDetails>;
