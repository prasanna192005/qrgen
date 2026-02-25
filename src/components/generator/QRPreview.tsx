import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy, Check, Save, FileCode, RotateCcw } from 'lucide-react';
import { QRFormat } from '../../types';

interface QRPreviewProps {
    qrRef: React.RefObject<HTMLDivElement>;
    qrValue: string;
    qrSize: number;
    fgColor: string;
    bgColor: string;
    logo: string | null;
    logoSize: number;
    downloadQR: () => void;
    copyToClipboard: () => void;
    copied: boolean;
    exportFormat: QRFormat;
    setExportFormat: (format: QRFormat) => void;
    isRegenerating: boolean;
    currentStep: number;
    onStartOver: () => void;
}

export const QRPreview = ({
    qrRef, qrValue, fgColor, bgColor, logo, logoSize,
    downloadQR, copyToClipboard, copied,
    exportFormat, setExportFormat, isRegenerating, currentStep,
    onStartOver
}: QRPreviewProps) => {
    return (
        <div className="lg:col-span-4 lg:sticky lg:top-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-studio-xl relative overflow-hidden flex flex-col items-center">
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '30px 30px' }} />

                <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Header Status */}
                    <div className="bg-slate-50 text-slate-500 border border-slate-100 px-4 py-1.5 rounded-full mb-8 flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">QR Output</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    </div>

                    {/* QR Canvas Container */}
                    <div
                        ref={qrRef}
                        className={`p-10 bg-white rounded-2xl shadow-studio border border-slate-50 transition-all duration-300 ${isRegenerating ? 'opacity-20 scale-95 blur-[2px]' : 'opacity-100 scale-100'}`}
                    >
                        <QRCodeCanvas
                            value={qrValue}
                            size={240}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level="H"
                            marginSize={0}
                            imageSettings={logo ? {
                                src: logo,
                                height: (240 * logoSize) / 200,
                                width: (240 * logoSize) / 200,
                                excavate: true,
                            } : undefined}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="text-xl font-bold font-outfit text-slate-900 mb-1">Your QR is Ready</h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">High-resolution export</p>
                    </div>

                    {currentStep === 2 && (
                        <div className="w-full mt-10 space-y-6 pt-10 border-t border-slate-100 animate-in fade-in duration-500">
                            {/* Format Selection (Merged In) */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'png', label: 'PNG', sub: 'Standard', icon: Save },
                                    { id: 'svg', label: 'SVG', sub: 'Vector', icon: FileCode },
                                ].map((format) => (
                                    <button
                                        key={format.id}
                                        onClick={() => setExportFormat(format.id as QRFormat)}
                                        className={`flex flex-col items-start p-4 rounded-xl transition-all duration-300 border ${exportFormat === format.id
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]'
                                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`mb-3 p-2 rounded-lg ${exportFormat === format.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                                            <format.icon className={`w-3.5 h-3.5 ${exportFormat === format.id ? 'text-white' : 'text-slate-400'}`} />
                                        </div>
                                        <span className="text-[12px] font-black tracking-tight mb-0.5 font-outfit">{format.label}</span>
                                        <span className={`text-[8px] font-bold uppercase tracking-widest opacity-60`}>{format.sub}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={downloadQR}
                                    className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-blue-500/10"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download file</span>
                                </button>

                                <button
                                    onClick={copyToClipboard}
                                    className="w-full flex items-center justify-center space-x-3 bg-slate-50 hover:bg-slate-100 text-slate-600 py-5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-slate-100"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    <span>{copied ? 'Copied to Clipboard' : 'Copy Image'}</span>
                                </button>
                            </div>

                            {/* Start Over Action (Integrated) */}
                            <button
                                onClick={onStartOver}
                                className="w-full flex items-center justify-center space-x-2 py-2 text-[10px] font-black text-slate-300 hover:text-rose-600 transition-colors uppercase tracking-[0.2em]"
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span>Start New Generation</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
