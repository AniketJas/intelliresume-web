import { LayoutDashboard, History, Plus, LogOut, User, X, Brain } from "lucide-react";

interface SidebarProps {
    activeView: "dashboard" | "history";
    setActiveView: (view: "dashboard" | "history") => void;
    isOpen: boolean;
    onClose: () => void;
    onAnalyseNew: () => void;
    onLogout: () => void;
    user: {
        name: string;
        email: string;
    };
}

export default function Sidebar({
    activeView,
    setActiveView,
    isOpen,
    onClose,
    onAnalyseNew,
    onLogout,
    user
}: SidebarProps) {
    return (
        <>
            {/* Sidebar (Desktop) */}
            <aside className="fixed left-0 top-[72px] bottom-0 w-[280px] bg-white border-r border-slate-200/60 flex flex-col py-8 px-6 space-y-6 hidden md:flex z-30">
                <div className="flex items-center gap-4 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-slate-200 text-primary flex-shrink-0">
                        <User className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                </div>

                <nav className="space-y-1.5 flex-grow">
                    <button
                        onClick={() => setActiveView("dashboard")}
                        className={`w-full text-left rounded-xl font-medium flex items-center gap-3 p-3 transition-all cursor-pointer ${activeView === "dashboard"
                                ? "bg-primary-container text-white shadow-md shadow-primary/10"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm">Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveView("history")}
                        className={`w-full text-left rounded-xl font-medium flex items-center gap-3 p-3 transition-all cursor-pointer ${activeView === "history"
                                ? "bg-primary-container text-white shadow-md shadow-primary/10"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                    >
                        <History className="w-5 h-5" />
                        <span className="text-sm">History</span>
                    </button>
                </nav>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                    <button
                        onClick={onAnalyseNew}
                        className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-95 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        Analyse New Resume
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full text-left rounded-xl text-slate-500 hover:text-primary flex items-center gap-3 p-3 transition-colors duration-200 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Sidebar Drawer (Mobile) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer Content */}
                    <div className="relative flex flex-col w-80 max-w-[85vw] h-full bg-white p-6 shadow-2xl animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <Brain className="w-6 h-6 text-primary" />
                                <span className="font-bold text-slate-800 text-lg">IntelliResume</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-slate-200 text-primary flex-shrink-0">
                                <User className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-slate-800 truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1.5 flex-grow">
                            <button
                                onClick={() => {
                                    setActiveView("dashboard");
                                    onClose();
                                }}
                                className={`w-full text-left rounded-xl font-medium flex items-center gap-3 p-3 transition-all cursor-pointer ${activeView === "dashboard"
                                        ? "bg-primary-container text-white"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="text-sm">Dashboard</span>
                            </button>
                            <button
                                onClick={() => {
                                    setActiveView("history");
                                    onClose();
                                }}
                                className={`w-full text-left rounded-xl font-medium flex items-center gap-3 p-3 transition-all cursor-pointer ${activeView === "history"
                                        ? "bg-primary-container text-white"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <History className="w-5 h-5" />
                                <span className="text-sm">History</span>
                            </button>
                        </nav>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <button
                                onClick={() => {
                                    onAnalyseNew();
                                    onClose();
                                }}
                                className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer"
                            >
                                <Plus className="w-5 h-5" />
                                Analyse New Resume
                            </button>
                            <button
                                onClick={() => {
                                    onLogout();
                                    onClose();
                                }}
                                className="w-full text-left rounded-xl text-slate-500 hover:text-primary flex items-center gap-3 p-3 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="text-sm font-semibold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
