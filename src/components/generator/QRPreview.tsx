import { Download, Check, Copy } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

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
}

export const QRPreview = ({
    qrRef, qrValue, qrSize, fgColor, bgColor, logo, logoSize,
    downloadQR, copyToClipboard, copied
}: QRPreviewProps) => {
    return (
        <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden">
                <div className="bg-white rounded-[2.25rem] overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-rose-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live Generator</span>
                    </div>

                    <div className="p-10 flex flex-col items-center">
                        <div className="relative group mb-10">
                            <div className="absolute -inset-8 bg-blue-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div
                                className="relative p-8 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.15)] border-4 border-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_48px_80px_-15px_rgba(0,0,0,0.2)]"
                                style={{ backgroundColor: bgColor }}
                                ref={qrRef}
                            >
                                <QRCodeCanvas
                                    value={qrValue}
                                    size={qrSize > 300 ? 300 : qrSize}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    level="H"
                                    includeMargin={true}
                                    imageSettings={
                                        logo
                                            ? {
                                                src: logo,
                                                x: undefined,
                                                y: undefined,
                                                height: (logoSize / 100) * (qrSize > 300 ? 300 : qrSize),
                                                width: (logoSize / 100) * (qrSize > 300 ? 300 : qrSize),
                                                excavate: true,
                                            }
                                            : undefined
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <button
                                onClick={downloadQR}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-blue-200 active:scale-[0.98]"
                            >
                                <Download className="w-5 h-4 mr-3" />
                                Download Assets
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className={`w-full font-bold py-5 px-8 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 active:scale-[0.98] ${copied
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                    : 'bg-white border-slate-100 text-slate-700 hover:border-slate-200 shadow-sm'
                                    }`}
                            >
                                {copied ? (
                                    <><Check className="w-5 h-4 mr-3" /> Copied</>
                                ) : (
                                    <><Copy className="w-5 h-4 mr-3" /> Copy to Clipboard</>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50/50 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Encrypted & Ready for Print
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
