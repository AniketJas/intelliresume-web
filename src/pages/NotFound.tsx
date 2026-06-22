import { Brain, FileText, Search, Unlink, CircleX, Home, ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = (): void => {
        navigate("/");
    };

    const handleGoBack = (): void => {
        navigate(-1);
    };

    const handleLoginClick = (): void => {
        navigate("/login");
    };

    const handleRegisterClick = (): void => {
        navigate("/register");
    };

    const handlePrivacyPolicyClick = (): void => {
        navigate("/notfound");
    };

    const handleTermsClick = (): void => {
        navigate("/notfound");
    };

    return (
        <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Atmospheric Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 gradient-glow" />
            </div>

            {/* Navigation suppressed per "Dead End" rule, but minimal branding anchor preserved */}
            <header className="w-full py-8 px-margin-desktop z-10">
                <div className="max-w-container-max mx-auto flex justify-center md:justify-start items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-sm">
                        <Brain className="text-white w-6 h-6" />
                    </div>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                        IntelliResume
                    </span>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop z-10 relative">
                {/* Center Content Wrapper */}
                <div className="max-w-3xl w-full text-center space-y-8 animate-fade-in-up">
                    {/* Visual Illustration Area */}
                    <div className="relative h-64 md:h-80 flex items-center justify-center mb-12">
                        {/* Decorative AI Icons */}
                        <div
                            className="absolute top-0 left-1/4 floating z-20"
                            style={{ animationDelay: "0s" }}
                        >
                            <div className="p-3 bg-white shadow-lg rounded-2xl border border-outline-variant/30 text-primary">
                                <FileText className="w-8 h-8" />
                            </div>
                        </div>
                        <div
                            className="absolute bottom-10 right-1/4 floating z-20"
                            style={{ animationDelay: "1.5s" }}
                        >
                            <div className="p-3 bg-white shadow-lg rounded-2xl border border-outline-variant/30 text-secondary">
                                <Search className="w-8 h-8" />
                            </div>
                        </div>
                        <div
                            className="absolute top-1/2 right-10 floating z-20"
                            style={{ animationDelay: "0.8s" }}
                        >
                            <div className="p-2 bg-white shadow-md rounded-xl border border-outline-variant/20 text-on-surface-variant">
                                <Unlink className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Broken Resume Visual */}
                        <div className="relative z-10 w-48 h-64 md:w-56 md:h-72 bg-surface-container-high rounded-[20px] border border-outline-variant/50 shadow-2xl flex flex-col p-6 animate-pulse-soft">
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-4 w-12 bg-outline-variant/20 rounded" />
                                <CircleX className="text-error w-8 h-8" />
                            </div>
                            <div className="space-y-3 flex-grow">
                                <div className="h-2.5 w-full bg-outline-variant/10 rounded" />
                                <div className="h-2.5 w-full bg-outline-variant/10 rounded" />
                                <div className="h-2.5 w-2/3 bg-outline-variant/10 rounded" />
                                <div className="h-2.5 w-full bg-outline-variant/10 rounded" />
                                <div className="h-2.5 w-1/2 bg-outline-variant/10 rounded" />
                            </div>
                            <div className="h-6 w-full bg-error/15 text-error rounded-lg flex items-center justify-center font-label-md text-label-md font-semibold">
                                Error 404
                            </div>
                        </div>
                    </div>

                    {/* Meta Text */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-error/5 text-error border border-error/10 rounded-full font-label-md text-label-md">
                            <Unlink className="w-4 h-4" />
                            Page Not Found
                        </span>
                        <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">
                            Oops! We Couldn't Find That Page
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            The page you're looking for doesn't exist, may have been moved, or the URL may be
                            incorrect.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGoHome}
                                className="px-8 py-3.5 bg-primary-container text-white rounded-full font-label-md text-label-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                                type="button"
                            >
                                <Home className="w-5 h-5" />
                                Go To Home
                            </button>
                            <button
                                onClick={handleGoBack}
                                className="px-8 py-3.5 bg-transparent border border-outline-variant text-on-surface rounded-full font-label-md text-label-md transition-all duration-200 hover:bg-surface-container-low hover:border-primary active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                                type="button"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </button>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        <a
                            onClick={handleLoginClick}
                            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md flex items-center gap-1.5 cursor-pointer"
                            href="#"
                        >
                            <LogIn className="w-4.5 h-4.5" />
                            Login
                        </a>
                        <a
                            onClick={handleRegisterClick}
                            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md flex items-center gap-1.5 cursor-pointer"
                            href="#"
                        >
                            <UserPlus className="w-4.5 h-4.5" />
                            Register
                        </a>
                    </div>
                </div>
            </main>

            <footer className="w-full py-8 px-margin-desktop border-t border-outline-variant/10 z-10">
                <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
                    <p>© 2026 IntelliResume AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a onClick={handlePrivacyPolicyClick} className="hover:text-primary transition-colors cursor-pointer" href="#">
                            Privacy Policy
                        </a>
                        <a onClick={handleTermsClick} className="hover:text-primary transition-colors cursor-pointer" href="#">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
