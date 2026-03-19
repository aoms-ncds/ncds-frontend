import { ObjectId } from "mongoose";

interface ILanguage extends MongooseDocument {
    _id: string;
    name: string;
}
interface IReligion extends MongooseDocument {
    religion?: string;
}
interface IPaymentMethod extends MongooseDocument {
    paymentMethod?: string;
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
interface ICustomUsers extends MongooseDocument {
    name: string;
    division: string;
    eSign: FileObject | null;
}
type CreatablePaymentMethod= Creatable<IPaymentMethod>;

type MyCreatableChildSupport = Creatable<IChildSupport>;

type CreatableLanguage = Creatable<ILanguage>;

type CreatableCustomUsers = Creatable<ICustomUsers>;

type CreatableGender = Creatable<IGender>;

type CreatableReligion = Creatable<IReligion>;
