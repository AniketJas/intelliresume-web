import { Brain, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const username = user?.name || "User";

    return (
        <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex justify-between items-center px-6 md:px-10 w-full z-40 shadow-sm">
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
                    <span className="font-semibold text-sm text-slate-700 bg-indigo-50/50 px-4 py-2 rounded-2xl border border-indigo-100/50">
                        Welcome, {username}
                    </span>
                </div>
            </div>
        </nav>
    );
}
