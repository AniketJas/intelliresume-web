import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import Google from "../assets/Google";
import "../styles/registerPage.css";

const registerSchema = z.object({
    name: z.string().min(2, "Full Name must be at least 2 characters long"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [submitError, setSubmitError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleGoogleSignUp = () => {
        navigate("/wip");
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");
        const result = registerSchema.safeParse({ name, email, password });
        if (!result.success) {
            const fieldErrors: { name?: string; email?: string; password?: string } = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof typeof fieldErrors;
                fieldErrors[path] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

        try {
            const response = await axios.post("/users/register", { name, email, password });
            if (response.data.success) {
                // Navigate to login with success feedback
                navigate("/login", { state: { message: "Account created successfully! Please sign in." } });
            } else {
                setSubmitError(response.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            const msg = err.response?.data?.message || "Something went wrong. Please try again.";
            setSubmitError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleTermsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/notfound");
    };

    const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/notfound");
    };

    return (
        <div className="bg-surface-container-lowest font-body-md text-on-background min-h-screen relative overflow-x-hidden flex flex-col">
            {/* Subtle Indigo Radial Glow Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] transition-transform duration-75 ease-out"
                    style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
                />
                <div
                    className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] transition-transform duration-75 ease-out"
                    style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
                />
            </div>

            {/* Header / Brand Logo */}
            <header className="fixed top-0 left-0 w-full p-8 z-50 animate-fade-in-down">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded p-1 cursor-pointer"
                    aria-label="Go to homepage"
                >
                    <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
                        <Brain className="w-6 h-6" />
                    </div>
                    <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">IntelliResume</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
                <div className="w-full max-w-[450px] bg-white rounded-[24px] border border-outline-variant shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 animate-fade-in-up">
                    {/* Auth Header */}
                    <div className="flex flex-col items-start gap-4 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary font-label-md text-label-md border border-primary/10 rounded-full">
                            <span className="text-xs">✨</span> Join IntelliResume
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-on-background font-headline-md text-headline-md font-bold mb-2">Create Your Account</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant">Start analyzing resumes with AI-powered insights and ATS optimization.</p>
                        </div>
                    </div>

                    {/* Social Auth Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="w-full h-[52px] border border-outline-variant rounded-xl flex items-center justify-center gap-3 mb-6 font-label-md text-label-md text-on-background hover:bg-surface-container transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98]"
                        aria-label="Sign up with Google"
                    >
                        <Google className="w-5 h-5" />
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Continue with Google</span>
                    </button>

                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-[#F1F5F9]"></div>
                        <span className="flex-shrink mx-4 text-outline text-[11px] font-bold tracking-widest uppercase">OR</span>
                        <div className="flex-grow border-t border-[#F1F5F9]"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignUp} className="space-y-5" noValidate>
                        {submitError && (
                            <div className="p-4 bg-error-container text-on-error-container border border-error/20 rounded-xl text-body-sm font-semibold animate-fade-in-up" role="alert">
                                {submitError}
                            </div>
                        )}

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="name">Full Name</label>
                            <input
                                className={`w-full h-12 px-4 rounded-xl border bg-surface-container-lowest font-body-md text-on-surface placeholder:text-outline transition-all duration-200 input-focus-ring outline-none ${errors.name ? "input-error-ring" : "border-outline-variant"
                                    }`}
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) {
                                        setErrors((prev) => ({ ...prev, name: undefined }));
                                    }
                                    if (submitError) setSubmitError("");
                                }}
                                placeholder="John Doe"
                                type="text"
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <p className="text-error text-[12px] font-semibold mt-1 animate-fade-in-up" role="alert">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">Email Address</label>
                            <input
                                className={`w-full h-12 px-4 rounded-xl border bg-surface-container-lowest font-body-md text-on-surface placeholder:text-outline transition-all duration-200 input-focus-ring outline-none ${errors.email ? "input-error-ring" : "border-outline-variant"
                                    }`}
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) {
                                        setErrors((prev) => ({ ...prev, email: undefined }));
                                    }
                                    if (submitError) setSubmitError("");
                                }}
                                placeholder="john@example.com"
                                type="email"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-error text-[12px] font-semibold mt-1 animate-fade-in-up" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    className={`w-full h-12 px-4 rounded-xl border bg-surface-container-lowest font-body-md text-on-surface placeholder:text-outline transition-all duration-200 input-focus-ring outline-none pr-12 ${errors.password ? "input-error-ring" : "border-outline-variant"
                                        }`}
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) {
                                            setErrors((prev) => ({ ...prev, password: undefined }));
                                        }
                                        if (submitError) setSubmitError("");
                                    }}
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-error text-[12px] font-semibold mt-1 animate-fade-in-up" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <p className="text-[12px] text-on-surface-variant leading-relaxed">
                            By signing up, you agree to our{" "}
                            <a className="text-primary hover:underline cursor-pointer" onClick={handleTermsClick}>Terms of Service</a>
                            {" "}and{" "}
                            <a className="text-primary hover:underline cursor-pointer" onClick={handlePrivacyClick}>Privacy Policy</a>.
                        </p>

                        {/* Submit Button */}
                        <button
                            className="w-full h-[52px] bg-primary text-white font-label-md text-label-md font-bold rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                            <ArrowRight className="w-[18px] h-[18px]" />
                        </button>
                    </form>

                    {/* Bottom Link */}
                    <div className="mt-8 pt-6 border-t border-outline-variant text-center">
                        <p className="text-body-sm text-on-surface-variant">
                            Already have an account?
                            <a
                                className="text-primary font-bold hover:underline decoration-primary/30 ml-1 focus:outline-none focus:ring-2 focus:ring-primary rounded px-1 cursor-pointer"
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}