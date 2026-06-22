import { useState, useEffect, useMemo } from "react";
import { Brain, Sparkles, Hammer, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/workInProgress.css";

interface Particle {
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
}

export default function WorkInProgress() {
    const navigate = useNavigate();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            setMouseOffset({ x: moveX, y: moveY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: 20 }, (_, idx) => {
            const seed1 = idx * 1.5;
            const seed2 = idx * 2.8;
            const seed3 = idx * 3.7;
            const seed4 = idx * 4.2;
            const seed5 = idx * 5.9;

            const rand1 = Math.sin(seed1) * 10000;
            const left = (rand1 - Math.floor(rand1)) * 100;

            const rand2 = Math.sin(seed2) * 10000;
            const top = (rand2 - Math.floor(rand2)) * 100;

            const rand3 = Math.sin(seed3) * 10000;
            const size = (rand3 - Math.floor(rand3)) * 6 + 2;

            const rand4 = Math.sin(seed4) * 10000;
            const delay = (rand4 - Math.floor(rand4)) * 5;

            const rand5 = Math.sin(seed5) * 10000;
            const duration = (rand5 - Math.floor(rand5)) * 10 + 5;

            return {
                id: idx,
                left,
                top,
                size,
                delay,
                duration,
            };
        });
    }, []);

    const handleGoBack = (): void => {
        navigate(-1);
    };

    const handleReturnHome = (): void => {
        navigate("/");
    };


    return (
        <div className="bg-surface font-body-md text-on-surface overflow-hidden min-h-screen relative flex flex-col">
            {/* Atmospheric Background Layers */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pulse-soft" />
                <div
                    className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[100px] pulse-soft"
                    style={{ animationDelay: "2s" }}
                />
                <div id="particle-container" className="absolute inset-0">
                    {particles.map((p) => (
                        <div
                            key={p.id}
                            className="particle"
                            style={{
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                animationDelay: `${p.delay}s`,
                                animationDuration: `${p.duration}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Wrapper */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-between py-12 px-margin-mobile md:px-margin-desktop w-full">
                {/* Header: Branding */}
                <header
                    className="w-full max-w-container-max flex justify-center items-center fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    <button
                        onClick={handleReturnHome}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded p-1 cursor-pointer"
                        aria-label="Go to homepage"
                    >
                        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-sm">
                            <Brain className="text-white w-6 h-6" />
                        </div>
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                            IntelliResume
                        </span>
                    </button>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow flex flex-col items-center justify-center max-w-2xl w-full text-center relative py-12">
                    {/* Illustration Area */}
                    <div className="relative w-72 h-48 mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div
                            className="absolute inset-0 flex items-center justify-center float-element"
                            style={{
                                transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)`,
                            }}
                        >
                            <div className="w-32 h-32 bg-primary/5 rounded-[32px] flex items-center justify-center border border-primary/10">
                                <Hammer className="w-16 h-16 text-primary animate-pulse-soft" />
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div
                            className="absolute top-4 left-4 float-element"
                            style={{
                                animationDelay: "0.4s",
                                transform: `translate(${mouseOffset.x * -1}px, ${mouseOffset.y * -1}px)`,
                            }}
                        >
                            <div className="w-48 h-32 bg-surface-container-high rounded-[20px] border border-outline-variant/50 shadow-lg flex flex-col p-4">
                                <div className="h-3 w-16 bg-outline-variant/30 rounded mb-4" />
                                <div className="space-y-2 flex-grow">
                                    <div className="h-2 w-full bg-outline-variant/15 rounded" />
                                    <div className="h-2 w-5/6 bg-outline-variant/15 rounded" />
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute -bottom-4 right-4 float-element"
                            style={{
                                animationDelay: "0.6s",
                                transform: `translate(${mouseOffset.x * 1.2}px, ${mouseOffset.y * -0.8}px)`,
                            }}
                        >
                            <div className="w-40 h-28 bg-surface-container rounded-[20px] border border-outline-variant/30 shadow-md flex flex-col p-4">
                                <div className="h-2.5 w-full bg-primary/10 rounded" />
                                <div className="h-2.5 w-full bg-outline-variant/10 rounded" />
                                <div className="h-2.5 w-1/2 bg-outline-variant/10 rounded" />
                                <div className="mt-auto flex justify-between">
                                    <div className="h-4 w-4 rounded-full bg-secondary/20" />
                                    <div className="h-4 w-10 bg-primary/20 rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute top-1/2 -right-4 float-element"
                            style={{
                                animationDelay: "0.8s",
                                transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)`,
                            }}
                        >
                            <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-secondary/20">
                                <Sparkles className="text-secondary w-7 h-7" />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md border border-outline-variant/20">
                            <Hammer className="w-4 h-4" />
                            Work In Progress
                        </span>
                        <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                            This Feature Is <span className="text-primary">Under Development</span>
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
                            We're actively building this feature and it will be available soon. Thank you for your patience as
                            we polish the AI experience.
                        </p>
                    </div>

                    {/* Progress Card */}
                    <div className="mt-12 w-full glass-card rounded-[24px] p-8 fade-in-up" style={{ animationDelay: "0.4s" }}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">
                                Feature Status Development Progress
                            </h3>
                            <span className="font-headline-sm text-headline-sm text-primary font-bold">75%</span>
                        </div>
                        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden mb-6">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ width: "75%" }}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="mt-12 flex flex-col sm:flex-row gap-4 w-full justify-center fade-in-up"
                        style={{ animationDelay: "0.5s" }}
                    >
                        <button
                            onClick={handleGoBack}
                            className="px-8 py-4 bg-primary text-white rounded-full font-label-md text-label-md font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                        <button
                            onClick={handleReturnHome}
                            className="px-8 py-4 bg-transparent border border-outline-variant text-on-surface rounded-full font-label-md text-label-md font-semibold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </button>
                    </div>
                </main>

                {/* Footer */}
                <footer
                    className="w-full flex flex-col md:flex-row justify-between items-center py-6 border-t border-outline-variant/20 fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                >
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 md:mb-0">
                        © 2026 IntelliResume AI. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
