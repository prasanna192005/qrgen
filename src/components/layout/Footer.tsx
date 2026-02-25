export const Footer = () => {
    return (
        <footer className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold text-slate-900 mb-1 leading-none italic">QR Gen</h3>
                <p className="text-xs text-slate-400 font-medium font-mono uppercase tracking-[0.3em]">Precision Engineering</p>
            </div>

            <div className="flex space-x-12">
                <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Product</span>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">API Keys</a></li>
                        <li><a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">Docs</a></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Connect</span>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors cursor-not-allowed">GitHub</a></li>
                        <li><a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors cursor-not-allowed">Discord</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-right flex flex-col items-center md:items-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    &copy; {new Date().getFullYear()} QR Gen Labs
                </p>
                <p className="text-[9px] text-slate-300 font-medium">Bespoke software for the modern web.</p>
            </div>
        </footer>
    );
};
