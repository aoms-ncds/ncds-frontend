interface ILanguage extends MongooseDocument {
    _id: string;
    name: string;
}
interface IReligion extends MongooseDocument {
    religion?: string;
}
interface IGender extends MongooseDocument {
    _id: string;
    gender: string;
}
interface IChildSupport extends MongooseDocument {
    name: string;
    status: number;
    amount: number;
}
type MyCreatableChildSupport = Creatable<IChildSupport>;

type CreatableLanguage = Creatable<ILanguage>;

type CreatableGender = Creatable<IGender>;

type CreatableReligion = Creatable<IReligion>;
