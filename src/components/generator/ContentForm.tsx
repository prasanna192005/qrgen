import { X, CheckCircle2 } from 'lucide-react';
import { QRType, VCardData, EmailData, EventData } from '../../types';

interface ContentFormProps {
    mode: QRType;
    url: string; setUrl: (val: string) => void;
    vCard: VCardData; setVCard: (val: VCardData) => void;
    whatsapp: { phone: string; message: string }; setWhatsapp: (val: { phone: string; message: string }) => void;
    email: EmailData; setEmail: (val: EmailData) => void;
    sms: { phone: string; message: string }; setSms: (val: { phone: string; message: string }) => void;
    calendar: EventData; setCalendar: (val: EventData) => void;
}

const FloatingInput = ({
    label, value, onChange, type = "text", isValid = false
}: {
    label: string, value: string, onChange: (val: string) => void, type?: string, isValid?: boolean
}) => (
    <div className="floating-input-group">
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="floating-input font-inter"
            placeholder=" "
        />
        <label className="floating-label">{label}</label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
            {isValid && value && <CheckCircle2 className="w-4 h-4 text-slate-900" />}
        </div>
    </div>
);

export const ContentForm = (props: ContentFormProps) => {
    const { mode, url, setUrl, vCard, setVCard, whatsapp, setWhatsapp, email, setEmail, sms, setSms, calendar, setCalendar } = props;

    const validateUrl = (val: string) => val.startsWith('http');
    const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val: string) => val.length > 5;

    return (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-studio animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-10">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 font-inter mb-1">02 / Configuration</h2>
                <p className="text-xl font-bold text-slate-900 font-outfit">Enter Details</p>
            </div>

            <div className="space-y-4">
                {mode === 'url' && (
                    <FloatingInput
                        label="Website URL"
                        value={url}
                        onChange={setUrl}
                        isValid={validateUrl(url)}
                    />
                )}

                {mode === 'vcard' && (
                    <div className="grid md:grid-cols-2 gap-x-6">
                        <FloatingInput label="First Name" value={vCard.firstName} onChange={(v) => setVCard({ ...vCard, firstName: v })} />
                        <FloatingInput label="Last Name" value={vCard.lastName} onChange={(v) => setVCard({ ...vCard, lastName: v })} />
                        <FloatingInput label="Phone Number" value={vCard.phone} onChange={(v) => setVCard({ ...vCard, phone: v })} isValid={validatePhone(vCard.phone)} />
                        <FloatingInput label="Email Address" value={vCard.email} onChange={(v) => setVCard({ ...vCard, email: v })} isValid={validateEmail(vCard.email)} />
                        <FloatingInput label="Company Name" value={vCard.company} onChange={(v) => setVCard({ ...vCard, company: v })} />
                        <FloatingInput label="Website" value={vCard.website} onChange={(v) => setVCard({ ...vCard, website: v })} />
                    </div>
                )}

                {mode === 'whatsapp' && (
                    <div className="space-y-6">
                        <FloatingInput label="WhatsApp Phone Number" value={whatsapp.phone} onChange={(v) => setWhatsapp({ ...whatsapp, phone: v })} isValid={validatePhone(whatsapp.phone)} />
                        <div className="floating-input-group">
                            <textarea
                                value={whatsapp.message}
                                onChange={(e) => setWhatsapp({ ...whatsapp, message: e.target.value })}
                                className="floating-input min-h-[140px] resize-none py-6 font-inter"
                                placeholder=" "
                            />
                            <label className="floating-label">Personal Message (Optional)</label>
                        </div>
                    </div>
                )}

                {mode === 'email' && (
                    <div className="space-y-6">
                        <FloatingInput label="Recipient Email" value={email.address} onChange={(v) => setEmail({ ...email, address: v })} isValid={validateEmail(email.address)} />
                        <FloatingInput label="Email Subject" value={email.subject} onChange={(v) => setEmail({ ...email, subject: v })} />
                        <div className="floating-input-group">
                            <textarea
                                value={email.body}
                                onChange={(e) => setEmail({ ...email, body: e.target.value })}
                                className="floating-input min-h-[140px] resize-none py-6 font-inter"
                                placeholder=" "
                            />
                            <label className="floating-label">Message Content</label>
                        </div>
                    </div>
                )}

                {mode === 'sms' && (
                    <div className="space-y-6">
                        <FloatingInput label="Phone Number" value={sms.phone} onChange={(v) => setSms({ ...sms, phone: v })} isValid={validatePhone(sms.phone)} />
                        <div className="floating-input-group">
                            <textarea
                                value={sms.message}
                                onChange={(e) => setSms({ ...sms, message: e.target.value })}
                                className="floating-input min-h-[140px] resize-none py-6 font-inter"
                                placeholder=" "
                            />
                            <label className="floating-label">Text Message</label>
                        </div>
                    </div>
                )}

                {mode === 'event' && (
                    <div className="space-y-6">
                        <FloatingInput label="Event Name" value={calendar.title} onChange={(v) => setCalendar({ ...calendar, title: v })} />
                        <FloatingInput label="Event Location" value={calendar.location} onChange={(v) => setCalendar({ ...calendar, location: v })} />
                        <FloatingInput type="datetime-local" label="Start Date & Time" value={calendar.startDate} onChange={(v) => setCalendar({ ...calendar, startDate: v })} />
                        <div className="floating-input-group">
                            <textarea
                                value={calendar.description}
                                onChange={(e) => setCalendar({ ...calendar, description: e.target.value })}
                                className="floating-input min-h-[140px] resize-none py-6 font-inter"
                                placeholder=" "
                            />
                            <label className="floating-label">Event Details</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
