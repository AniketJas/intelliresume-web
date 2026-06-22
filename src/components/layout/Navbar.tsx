import { Brain, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    onMenuClick: () => void;
    onLogout: () => void;
}

export default function Navbar({ onMenuClick, onLogout }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex justify-between items-center px-6 md:px-10 w-full z-45 shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 bg-transparent border-none cursor-pointer"
                    aria-label="Open sidebar menu"
                >
                    <Menu className="w-6 h-6 text-slate-700" />
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent border-none"
                >
                    <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white">
                        <Brain className="w-6 h-6" />
                    </div>
                    <span className="font-headline-md text-lg md:text-headline-md font-bold tracking-tight text-primary">
                        IntelliResume
                    </span>
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onLogout}
                        className="p-2 text-slate-400 hover:text-slate-700 transition-colors active:scale-95 bg-transparent border-none cursor-pointer"
                        aria-label="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-slate-200">
                        <img
                            className="w-full h-full object-cover"
                            alt="User Avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs0DdRLd0G2h-vuBI-Tzmvze_TWY1j05EjEt34s4Akva1O5XfqM6Bi6TAG2nmHEmUsRCgOZEwadmc-2myuYcGdEE-E0h8ENPWX42or-O0hryGwVFmpuQeOiwVO-oogod4tyiRvtdXgk-Acoe4afgXMnNAC_raVFEjxMvUe5g6SE95j9A9klyalaE74YHaCO5W0ZX2EmbMws2u4Kab9ifgw6s_Do_OsKiRqG-oFxmz-OMHGdxtD26QBRsLeVJoKVo8IbIKme91V8GA"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
