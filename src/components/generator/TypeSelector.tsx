import { QRMode, QRType } from '../../types';

interface TypeSelectorProps {
    mode: QRType;
    setMode: (mode: QRType) => void;
    modes: QRMode[];
}

export const TypeSelector = ({ mode, setMode, modes }: TypeSelectorProps) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 font-inter">01 / Selection</h2>
                    <p className="text-xl font-bold text-slate-900 font-outfit">Choose Protocol</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {modes.map((type) => {
                    const Icon = type.icon;
                    const isActive = mode === type.id;

                    return (
                        <button
                            key={type.id}
                            onClick={() => setMode(type.id)}
                            className={`group relative flex flex-col items-start p-8 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-slate-900 text-white shadow-studio-xl -translate-y-1'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-900 hover:-translate-y-1 hover:shadow-studio'
                                }`}
                        >
                            <div className={`mb-6 p-4 rounded-xl transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900'
                                }`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <span className="block text-lg font-bold mb-1 tracking-tight font-outfit">{type.label}</span>
                                <span className={`text-xs font-medium leading-relaxed transition-colors ${isActive ? 'text-slate-400' : 'text-slate-400'
                                    }`}>
                                    {type.description}
                                </span>
                            </div>
                            {isActive && (
                                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-blue-500" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
