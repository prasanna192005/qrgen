export type QRMode = 'url' | 'vcard' | 'whatsapp' | 'email' | 'sms' | 'calendar';

export interface VCardData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    jobTitle: string;
    website: string;
}

export interface WhatsAppData {
    phone: string;
    message: string;
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

export interface CalendarData {
    title: string;
    location: string;
    startTime: string;
    endTime: string;
    description: string;
}
