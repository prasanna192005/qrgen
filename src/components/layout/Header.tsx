import { Shield, Heart } from 'lucide-react';

export const Header = () => {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
                <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                        v2.0 Beta
                    </span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">
                    QR<span className="text-blue-600">Gen.</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-md">
                    The high-fidelity QR engine for professionals. Designed for precision, engineered for scale.
                </p>
            </div>
            <div className="flex items-center space-x-6 text-slate-300 pb-2">
                <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Open Source</span>
                </div>
            </div>
        </header>
    );
};
