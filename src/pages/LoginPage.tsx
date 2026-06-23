import React, { useState, useEffect } from "react";
import { Brain, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { useUserStore } from "../store";
import Google from "../assets/Google";
import "../styles/loginPage.css";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message || "";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [submitError, setSubmitError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const loginStore = useUserStore((state) => state.login);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleGoogleLogin = () => {
        navigate("/wip");
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError("");
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors: { email?: string; password?: string } = {};
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
            const response = await axios.post("/users/login", { email, password });
            if (response.data.success || response.data.success === 1) {
                const userData = response.data.data;
                
                // Add JWT token to localStorage for authentication state synchronization
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }

                loginStore({
                    id: userData.id || userData._id || "user-id",
                    name: userData.name || "",
                    email: userData.email || "",
                });
                navigate("/dashboard");
            } else {
                setSubmitError(response.data.message || "Invalid email or password.");
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            const msg = err.response?.data?.message || "Invalid email or password.";
            setSubmitError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/notfound");
    };

    const handleCreateAccount = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate("/register");
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

            {/* Header / Branding */}
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

            {/* Main Content: Auth Card */}
            <main className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
                <div className="w-full max-w-[450px] bg-white rounded-[24px] border border-outline-variant shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 animate-fade-in-up">
                    {/* Welcome Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary font-label-md text-label-md border border-primary/10">
                            <span className="text-xs">✨</span> Welcome Back
                        </span>
                    </div>

                    {/* Header Content */}
                    <div className="mb-8">
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Sign In to IntelliResume</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Continue analyzing resumes, tracking ATS scores, and improving your job applications.
                        </p>
                    </div>

                    {/* Social Login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full h-[52px] flex items-center justify-center gap-3 bg-white border border-outline-variant rounded-xl hover:bg-surface-container transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Sign in with Google"
                        disabled={isLoading}
                    >
                        <Google className="w-5 h-5" />
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-grow h-px bg-outline-variant"></div>
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">OR</span>
                        <div className="flex-grow h-px bg-outline-variant"></div>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleLogin} className="space-y-5" noValidate>
                        {successMessage && !submitError && (
                            <div className="p-4 bg-primary/5 text-primary border border-primary/10 rounded-xl text-body-sm font-semibold animate-fade-in-up">
                                {successMessage}
                            </div>
                        )}
                        {submitError && (
                            <div className="p-4 bg-error-container text-on-error-container border border-error/20 rounded-xl text-body-sm font-semibold animate-fade-in-up" role="alert">
                                {submitError}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                                Email Address
                            </label>
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
                            <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                                Password
                            </label>
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
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors duration-200 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-error text-[12px] font-semibold mt-1 animate-fade-in-up" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end py-1">
                            <a
                                className="font-label-md text-label-md text-primary font-semibold hover:underline underline-offset-4 decoration-primary/30 transition-all cursor-pointer"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full h-[52px] bg-primary text-white rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                            <ArrowRight className="w-[18px] h-[18px]" />
                        </button>
                    </form>

                    {/* Card Footer */}
                    <div className="mt-8 pt-6 border-t border-outline-variant text-center">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Don't have an account?{" "}
                            <a className="text-primary font-bold hover:underline decoration-primary/30 cursor-pointer" onClick={handleCreateAccount}>
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
