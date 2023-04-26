

export default {};

declare global{
    interface Application {
        _id: string;
        name: string;
        reason: string;
        status: string;

    }
}
