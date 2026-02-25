import { Upload } from 'lucide-react';

interface StyleControlsProps {
    fgColor: string;
    setFgColor: (val: string) => void;
    bgColor: string;
    setBgColor: (val: string) => void;
    qrSize: number;
    setQrSize: (val: number) => void;
    logo: string | null;
    handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeLogo: () => void;
    logoSize: number;
    setLogoSize: (val: number) => void;
}

export const StyleControls = ({
    fgColor, setFgColor,
    bgColor, setBgColor,
    qrSize, setQrSize,
    logo, handleLogoUpload, removeLogo,
    logoSize, setLogoSize,
}: StyleControlsProps) => {
    const presets = [
        { l: 'Classic', f: '#0f172a', b: '#ffffff' },
        { l: 'Modern', f: '#3b82f6', b: '#ffffff' },
        { l: 'Nature', f: '#065f46', b: '#f0fdf4' },
        { l: 'Royal', f: '#4338ca', b: '#f5f3ff' },
    ];

    return (
        <section className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Upload className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Brand & Style</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Custom Colors</label>
                        <div className="flex items-center space-x-4">
                            <div className="space-y-1">
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer bg-white border border-slate-200 p-1" />
                                <span className="block text-[9px] font-bold text-slate-400 text-center">Foreground</span>
                            </div>
                            <div className="space-y-1">
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer bg-white border border-slate-200 p-1" />
                                <span className="block text-[9px] font-bold text-slate-400 text-center">Background</span>
                            </div>
                            <div className="flex-1 flex flex-wrap gap-1.5 pl-4 border-l border-slate-100">
                                {presets.map((p) => (
                                    <button
                                        key={p.l}
                                        onClick={() => { setFgColor(p.f); setBgColor(p.b); }}
                                        className="w-6 h-6 rounded-lg border border-slate-100 shadow-sm transition-transform hover:scale-110"
                                        style={{ background: `linear-gradient(135deg, ${p.f} 50%, ${p.b} 50%)` }}
                                        title={p.l}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">QR Resolution</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="128"
                                max="512"
                                step="32"
                                value={qrSize}
                                onChange={(e) => setQrSize(Number(e.target.value))}
                                className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none accent-blue-600"
                            />
                            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{qrSize}px</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Logo Branding</label>
                    {!logo ? (
                        <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group">
                            <Upload className="w-6 h-6 text-slate-300 group-hover:text-blue-500 mb-2" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase group-hover:text-blue-600">Upload SVG/PNG</span>
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        </label>
                    ) : (
                        <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 relative group animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white rounded-2xl border border-white shadow-sm p-2 flex items-center justify-center overflow-hidden">
                                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Logo Scale</span>
                                        <button onClick={removeLogo} className="text-[10px] text-rose-500 font-bold hover:underline">Remove</button>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="30"
                                        step="5"
                                        value={logoSize}
                                        onChange={(e) => setLogoSize(Number(e.target.value))}
                                        className="w-full h-1 bg-slate-200 rounded-full appearance-none accent-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
