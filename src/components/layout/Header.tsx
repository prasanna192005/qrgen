import { Github, Lock } from 'lucide-react';

export const Header = () => {
    return (
        <header className="flex flex-col md:flex-row md:items-start justify-between mb-20 gap-8">
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <span className="px-2.5 py-1 bg-white text-slate-900 text-[9px] font-black uppercase tracking-[0.1em] rounded border border-slate-200 shadow-sm">
                        v2.1 Stable
                    </span>
                    <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900 text-slate-400 text-[9px] font-bold uppercase tracking-[0.1em] rounded">
                        <Lock className="w-2.5 h-2.5 text-blue-500" />
                        <span className="text-white">Secure Architecture</span>
                    </div>
                </div>
                <h1 className="text-7xl font-black tracking-[-0.05em] text-slate-900 mb-4 font-outfit">
                    qr<span className="text-blue-600">19</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-md leading-relaxed text-lg tracking-tight">
                    The precision QR engine for enterprise workflows. Designed for performance, built for trust.
                </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-1">
                <div className="flex items-center space-x-8">
                    <a
                        href="https://github.com/prasanna192005/qrgen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <Github className="w-4 h-4" />
                        <span>View Source</span>
                    </a>
                </div>
            </nav>
        </header>
    );
};
