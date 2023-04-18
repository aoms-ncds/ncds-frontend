export { };

declare global {
    type Frrequest={
        _id: string;
        Frno: string;
        Frdate: Date;
        Division_name: string;
        Subdivision_name: string;
        Main_category: string;
        Request_amount: string;
        Lastupdate_date: Date;
        Sanction:string;
    }
}
