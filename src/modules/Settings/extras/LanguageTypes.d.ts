interface ILanguage extends MongooseDocument {
    name: string;
}
type CreatableLanguage = Creatable<ILanguage>;
