import { Upload, Palette, LayoutGrid, Check } from 'lucide-react';
import { DotStyle } from '../../types';

interface ColorPreset {
    id: string;
    name: string;
    fg: string;
    bg: string;
}

const PRESETS: ColorPreset[] = [
    { id: 'onyx', name: 'Onyx', fg: '#0f172a', bg: '#ffffff' },
    { id: 'midnight', name: 'Midnight', fg: '#020617', bg: '#f8fafc' },
    { id: 'electric', name: 'Electric', fg: '#2563eb', bg: '#ffffff' },
    { id: 'emerald', name: 'Emerald', fg: '#059669', bg: '#f0fdf4' },
    { id: 'rose', name: 'Rose', fg: '#e11d48', bg: '#fff1f2' },
    { id: 'amber', name: 'Amber', fg: '#d97706', bg: '#fffbeb' },
];

interface StyleControlsProps {
    fgColor: string;
    setFgColor: (color: string) => void;
    bgColor: string;
    setBgColor: (color: string) => void;
    qrSize: number;
    setQrSize: (size: number) => void;
    logo: string | null;
    handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeLogo: () => void;
    logoSize: number;
    setLogoSize: (size: number) => void;
    dotStyle: DotStyle;
    setDotStyle: (style: DotStyle) => void;
}

export const StyleControls = ({
    fgColor, setFgColor,
    bgColor, setBgColor,
    logo, handleLogoUpload, removeLogo,
    logoSize, setLogoSize,
    dotStyle, setDotStyle
}: StyleControlsProps) => {

    const applyPreset = (preset: ColorPreset) => {
        setFgColor(preset.fg);
        setBgColor(preset.bg);
    };

    return (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-studio space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-2">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 font-inter mb-1">03 / Visuals</h2>
                <p className="text-xl font-bold text-slate-900 font-outfit">Look & Feel</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Color Section */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-3 text-slate-900 group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 transition-colors">
                            <Palette className="w-4 h-4 text-slate-900" />
                        </div>
                        <span className="text-sm font-bold tracking-tight font-outfit">Color Studio</span>
                    </div>

                    <div className="space-y-8">
                        {/* Custom Pickers */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Main Color</label>
                                <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-slate-900">{fgColor.toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Background</label>
                                <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-slate-900">{bgColor.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Presets Grid */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Professional Presets</label>
                            <div className="grid grid-cols-3 gap-3">
                                {PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => applyPreset(preset)}
                                        className={`group relative p-1.5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${fgColor.toLowerCase() === preset.fg.toLowerCase() && bgColor.toLowerCase() === preset.bg.toLowerCase()
                                                ? 'border-slate-900 bg-slate-50'
                                                : 'border-slate-100 bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        <div
                                            className="w-full h-8 rounded-lg border border-black/5 overflow-hidden flex"
                                            style={{ backgroundColor: preset.bg }}
                                        >
                                            <div className="w-1/2 h-full" style={{ backgroundColor: preset.fg }} />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors">
                                            {preset.name}
                                        </span>
                                        {fgColor.toLowerCase() === preset.fg.toLowerCase() && bgColor.toLowerCase() === preset.bg.toLowerCase() && (
                                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white">
                                                <Check className="w-2 h-2 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shape Section */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-3 text-slate-900 group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 transition-colors">
                            <LayoutGrid className="w-4 h-4 text-slate-900" />
                        </div>
                        <span className="text-sm font-bold tracking-tight font-outfit">Block Style</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setDotStyle('square')}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center group-hover:scale-[1.02] ${dotStyle === 'square'
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-studio'
                                    : 'border-slate-100 text-slate-400 hover:border-slate-300 bg-white'
                                }`}
                        >
                            <div className={`w-8 h-8 mb-4 rounded-[2px] ${dotStyle === 'square' ? 'bg-white' : 'bg-slate-200'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Sharp (Standard)</span>
                        </button>
                        <button
                            onClick={() => setDotStyle('rounded')}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center group-hover:scale-[1.02] ${dotStyle === 'rounded'
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-studio'
                                    : 'border-slate-100 text-slate-400 hover:border-slate-300 bg-white'
                                }`}
                        >
                            <div className={`w-8 h-8 mb-4 rounded-full ${dotStyle === 'rounded' ? 'bg-white' : 'bg-slate-200'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Rounded (Modern)</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Brand Section */}
            <div className="pt-10 border-t border-slate-100 space-y-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-slate-900 group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 transition-colors">
                            <Upload className="w-4 h-4 text-slate-900" />
                        </div>
                        <span className="text-sm font-bold tracking-tight font-outfit">Logo Branding</span>
                    </div>
                    {logo && (
                        <button onClick={removeLogo} className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline transition-all">
                            Remove Logo
                        </button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <label className={`relative group cursor-pointer flex flex-col items-center justify-center p-12 border border-dashed rounded-2xl transition-all duration-300 ${logo ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-900 hover:bg-slate-50'
                        }`}>
                        <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                        {logo ? (
                            <img src={logo} alt="Logo" className="w-16 h-16 object-contain rounded shadow-lg mb-4" />
                        ) : (
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-slate-900 mb-4 transition-colors" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                            {logo ? 'Change Image' : 'Click to Upload Logo'}
                        </span>
                    </label>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo Size</label>
                            <span className="text-xs font-mono font-bold text-slate-900">{logoSize}%</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={logoSize}
                            onChange={(e) => setLogoSize(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                        />
                        <div className="flex items-start space-x-2">
                            <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5" />
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">System-optimized for scan performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
