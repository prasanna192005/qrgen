import { Globe, User, MessageSquare, Mail, Smartphone, Calendar } from 'lucide-react';
import { QRMode } from '../../types';

interface TypeSelectorProps {
    mode: QRMode;
    setMode: (mode: QRMode) => void;
}

export const TypeSelector = ({ mode, setMode }: TypeSelectorProps) => {
    const items = [
        { id: 'url', label: 'Website URL', icon: Globe },
        { id: 'vcard', label: 'Contact Card', icon: User },
        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
        { id: 'email', label: 'Send Email', icon: Mail },
        { id: 'sms', label: 'Text Message', icon: Smartphone },
        { id: 'calendar', label: 'Event Link', icon: Calendar },
    ];

    return (
        <section>
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                    <Globe className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Choose Content Type</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setMode(item.id as QRMode)}
                        className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${mode === item.id
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 translate-y-[-2px]'
                                : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-slate-50'
                            }`}
                    >
                        <item.icon className={`w-6 h-6 mb-3 transition-transform duration-300 ${mode === item.id ? 'scale-110 text-white' : 'text-slate-400 group-hover:scale-110 group-hover:text-blue-500'}`} />
                        <span className="block text-sm font-bold tracking-tight">{item.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};
