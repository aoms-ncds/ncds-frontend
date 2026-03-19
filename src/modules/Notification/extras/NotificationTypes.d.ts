import { Moment } from 'moment';


declare global {
    interface Recipients{
        id: string;
        read: boolean;
    }
    interface Message {
        _id: string;
        recipients: Recipients[];
        title: string;
        body: string;
        ref_url: string;
        img_url: string;
        primary_action_btn: string;
        primary_url: string;

        secondary_action_btn: string;
        secondary_url: string;
        date?: Moment;
        type?: MessagingServices;
        createdAt?: Moment;
        division:Division;
    }


    type MessagingServices = 'email' | 'whatsapp' | 'push';
}
