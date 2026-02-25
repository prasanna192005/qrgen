export const Footer = () => {
    return (
        <footer className="mt-40 py-12 border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-black tracking-tighter text-slate-900">qr<span className="text-blue-600">19</span></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-4">© 2026 YAAO PRODUCTIONS</span>
                </div>

                <div className="flex items-center space-x-10">

                    <a
                        href="https://github.com/prasanna192005/qrgen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};
