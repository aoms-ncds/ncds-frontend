interface ILanguage extends MongooseDocument {
    name: string;
}
interface IDesignation extends MongooseDocument{
    name:string;
}
interface IChildSupport extends MongooseDocument{
    name:string;
    status:number;
    amount:number;
}
type MyCreatableDesignation = Creatable<ILanguage>;
type MyCreatableChildSupport = Creatable<IChildSupport>;

type CreatableLanguage = Creatable<ILanguage>;
