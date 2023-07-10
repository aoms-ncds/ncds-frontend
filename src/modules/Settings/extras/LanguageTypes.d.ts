interface ILanguage extends MongooseDocument {
    _id:string;
    name: string;
}
interface IChildSupport extends MongooseDocument{
    name:string;
    status:number;
    amount:number;
}
type MyCreatableChildSupport = Creatable<IChildSupport>;

type CreatableLanguage = Creatable<ILanguage>;
