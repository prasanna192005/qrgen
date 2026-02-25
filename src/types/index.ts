export type QRType = 'url' | 'vcard' | 'whatsapp' | 'email' | 'sms' | 'event';
export type QRFormat = 'png' | 'svg';
export type DotStyle = 'square' | 'rounded';

export interface QRMode {
    id: QRType;
    label: string;
    description: string;
    icon: any;
}

export interface VCardData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    website: string;
}

export interface EmailData {
    address: string;
    subject: string;
    body: string;
}

export interface SMSData {
    phone: string;
    message: string;
}

export interface EventData {
    title: string;
    location: string;
    startDate: string;
    description: string;
}
