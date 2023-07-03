interface ILanguage extends MongooseDocument {
    name: string;
}
interface IDesignation extends MongooseDocument{
    name:string;
}
type MyCreatableDesignation = Creatable<ILanguage>;

type CreatableLanguage = Creatable<ILanguage>;
