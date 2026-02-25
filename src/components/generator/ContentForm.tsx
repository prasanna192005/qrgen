import { Smartphone } from 'lucide-react';
import { QRMode, VCardData, WhatsAppData, EmailData, SMSData, CalendarData } from '../../types';

interface ContentFormProps {
    mode: QRMode;
    url: string;
    setUrl: (val: string) => void;
    vCard: VCardData;
    setVCard: (val: VCardData) => void;
    whatsapp: WhatsAppData;
    setWhatsapp: (val: WhatsAppData) => void;
    email: EmailData;
    setEmail: (val: EmailData) => void;
    sms: SMSData;
    setSms: (val: SMSData) => void;
    calendar: CalendarData;
    setCalendar: (val: CalendarData) => void;
}

export const ContentForm = ({
    mode,
    url, setUrl,
    vCard, setVCard,
    whatsapp, setWhatsapp,
    email, setEmail,
    sms, setSms,
    calendar, setCalendar,
}: ContentFormProps) => {
    return (
        <section className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Smartphone className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Configure Details</h2>
            </div>

            <div className="space-y-6">
                {mode === 'url' ? (
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Target URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300 shadow-inner"
                        />
                    </div>
                ) : mode === 'whatsapp' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Phone Number</label>
                            <input
                                type="tel"
                                value={whatsapp.phone}
                                onChange={(e) => setWhatsapp({ ...whatsapp, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Message</label>
                            <input
                                type="text"
                                value={whatsapp.message}
                                onChange={(e) => setWhatsapp({ ...whatsapp, message: e.target.value })}
                                placeholder="Hello there!"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                    </div>
                ) : mode === 'email' ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Recipient Email</label>
                            <input
                                type="email"
                                value={email.address}
                                onChange={(e) => setEmail({ ...email, address: e.target.value })}
                                placeholder="hello@company.com"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Subject</label>
                                <input
                                    type="text"
                                    value={email.subject}
                                    onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                                    placeholder="Inquiry"
                                    className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Body Content</label>
                                <input
                                    type="text"
                                    value={email.body}
                                    onChange={(e) => setEmail({ ...email, body: e.target.value })}
                                    placeholder="Hi, I'm interested..."
                                    className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                ) : mode === 'sms' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Recipient Number</label>
                            <input
                                type="tel"
                                value={sms.phone}
                                onChange={(e) => setSms({ ...sms, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Message Body</label>
                            <input
                                type="text"
                                value={sms.message}
                                onChange={(e) => setSms({ ...sms, message: e.target.value })}
                                placeholder="Text message..."
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                    </div>
                ) : mode === 'calendar' ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Event Title</label>
                            <input
                                type="text"
                                value={calendar.title}
                                onChange={(e) => setCalendar({ ...calendar, title: e.target.value })}
                                placeholder="Strategy Session"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Start Time</label>
                                <input
                                    type="datetime-local"
                                    value={calendar.startTime}
                                    onChange={(e) => setCalendar({ ...calendar, startTime: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium appearance-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">End Time</label>
                                <input
                                    type="datetime-local"
                                    value={calendar.endTime}
                                    onChange={(e) => setCalendar({ ...calendar, endTime: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium appearance-none"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">First Name</label>
                            <input
                                type="text"
                                value={vCard.firstName}
                                onChange={(e) => setVCard({ ...vCard, firstName: e.target.value })}
                                placeholder="John"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Last Name</label>
                            <input
                                type="text"
                                value={vCard.lastName}
                                onChange={(e) => setVCard({ ...vCard, lastName: e.target.value })}
                                placeholder="Doe"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Phone Number</label>
                            <input
                                type="tel"
                                value={vCard.phone}
                                onChange={(e) => setVCard({ ...vCard, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-5 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all text-slate-700 font-medium"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
