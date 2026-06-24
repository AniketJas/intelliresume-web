import React, { useState, useRef } from "react";
import {
    UploadCloud,
    Paperclip,
    FileText,
    Trash2,
    ChartColumn,
    Info,
    Gauge,
    Star,
    Brain,
    TrendingUp,
    ArrowLeft,
    Loader2,
    CheckCircle2
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAnalysisStore } from "../store";
import "../styles/uploadResume.css";

export default function UploadResume() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const isUploading = useAnalysisStore((state) => state.isAnalyzing);
    const startAnalysis = useAnalysisStore((state) => state.startAnalysis);
    const [uploadError, setUploadError] = useState<string>(location.state?.error || "");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalyseResume = (): void => {
        if (!selectedFile) return;
        startAnalysis(selectedFile);
        navigate("/analysing", { state: { file: selectedFile } });
    };

    const handleBackToDashboard = (): void => {
        navigate("/dashboard");
    };

    // UI State Interaction Handlers
    const handleBrowseFiles = (): void => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    const handleChooseDifferentFile = (): void => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    const handleRemoveFile = (): void => {
        if (isUploading) return;
        setSelectedFile(null);
        setUploadError("");
        setUploadSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const isValidFileType = (file: File): boolean => {
        const validTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ];
        const extension = file.name.split(".").pop()?.toLowerCase();
        const validExtensions = ["pdf", "doc", "docx"];
        return validTypes.includes(file.type) || (extension !== undefined && validExtensions.includes(extension));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isUploading) return;
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (isValidFileType(file)) {
                setSelectedFile(file);
                setUploadError("");
                setUploadSuccess(false);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (isUploading) return;
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (isValidFileType(file)) {
                setSelectedFile(file);
                setUploadError("");
                setUploadSuccess(false);
            }
        }
    };

    // Helper for formatting file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md">
            {/* Top Navbar */}
            <Navbar
                onMenuClick={() => { }}
            />

            {/* Main Content Page container */}
            <main className="flex-grow pt-[120px] pb-8 px-6 md:px-10 max-w-5xl md:max-w-container-max mx-auto w-full flex flex-col">

                {/* Back to Dashboard Link */}
                <div className="mb-6 flex justify-start">
                    <button
                        onClick={handleBackToDashboard}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
                        aria-label="Back to Dashboard"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                </div>

                {/* Page Title & Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">
                        Analyze Resume
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Upload your professional profile to unlock AI-powered insights, ATS optimization, and personalized career recommendations.
                    </p>
                </div>

                {/* Grid layout containing upload area and info card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow">

                    {/* Left Column: Upload area and Tips */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Drag and Drop Canvas */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`bg-white border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center min-h-[420px] ambient-shadow transition-all duration-300 relative overflow-hidden group ${isDragging
                                ? "border-primary bg-indigo-50/20 scale-[0.99]"
                                : "border-slate-200 hover:border-primary-container"
                                }`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.docx,.doc"
                                className="hidden"
                                aria-label="Choose file input"
                            />

                            {/* State 1 & 2: Empty/Dragging State */}
                            {!selectedFile ? (
                                <div className="flex flex-col items-center text-center z-10 transition-all duration-300 animate-fade-in">
                                    <div className="w-20 h-20 bg-indigo-50 text-primary rounded-full flex items-center justify-center mb-6 animate-bounce-slow border border-indigo-100">
                                        <UploadCloud className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                                        {isDragging ? "Drop your file here" : "Drag and drop your resume"}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-semibold mb-6">
                                        PDF, DOCX, or DOC (Max 10MB)
                                    </p>
                                    <button
                                        onClick={handleBrowseFiles}
                                        className="bg-primary text-white font-bold text-sm px-8 py-3.5 rounded-2xl ambient-shadow hover:bg-opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/15"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                        Browse Files
                                    </button>
                                </div>
                            ) : (
                                /* State 3: Uploaded State */
                                <div className="w-full max-w-md z-10 animate-fade-in">
                                    <div className="bg-slate-50 rounded-2xl p-5 border border-indigo-100 flex items-center gap-4 shadow-sm">
                                        <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="font-bold text-sm text-slate-800 truncate">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-slate-400 font-semibold mt-0.5">
                                                {formatFileSize(selectedFile.size)} • Uploaded just now
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleRemoveFile}
                                            disabled={isUploading}
                                            className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Remove file"
                                            aria-label="Remove file"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                                        <button
                                            onClick={handleAnalyseResume}
                                            disabled={isUploading}
                                            className="flex-grow bg-primary text-white font-bold text-sm px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-opacity-95 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isUploading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <ChartColumn className="w-4 h-4" />
                                            )}
                                            {isUploading ? "Extracting..." : "Analyze Resume"}
                                        </button>
                                        <button
                                            onClick={handleChooseDifferentFile}
                                            disabled={isUploading}
                                            className="bg-white text-slate-700 border border-slate-200 font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Choose Different File
                                        </button>
                                    </div>

                                    {/* Success Message */}
                                    {uploadSuccess && (
                                        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 animate-fade-in">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            <p className="text-xs font-semibold">
                                                Resume text extracted successfully! Logged to the console.
                                            </p>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {uploadError && (
                                        <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 animate-fade-in">
                                            <Info className="w-5 h-5 flex-shrink-0 animate-pulse" />
                                            <p className="text-xs font-semibold">
                                                {uploadError}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tips / Guidance card */}
                        <div className="bg-slate-100/50 p-5 rounded-2xl border border-slate-200/60 flex items-start gap-4 shadow-xs">
                            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-600 leading-relaxed">
                                <span className="font-bold text-slate-700">Pro Tip:</span> For best results, ensure your resume is in a machine-readable text format. Scanned PDF images may have lower accuracy in ATS scoring.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 ambient-shadow space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-2">What You'll Receive</h2>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Our proprietary AI engine performs a multi-dimensional analysis of your profile.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                                        <Gauge className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-800">ATS Compatibility Score</p>
                                        <p className="text-xs text-slate-400 font-semibold mt-0.5">See how recruiters' systems see you.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary flex-shrink-0">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-800">Key Strengths Analysis</p>
                                        <p className="text-xs text-slate-400 font-semibold mt-0.5">Identifying your unique value prop.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-800">Skill Gap Mapping</p>
                                        <p className="text-xs text-slate-400 font-semibold mt-0.5">What's missing for your dream role.</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-800">Optimization Roadmap</p>
                                        <p className="text-xs text-slate-400 font-semibold mt-0.5">Step-by-step improvement guide.</p>
                                    </div>
                                </li>
                            </ul>

                            {/* Right Card Image decoration */}
                            <div className="h-[180px] w-full rounded-2xl overflow-hidden relative group shadow-sm">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="A professional, high-end office setting with soft indigo and white ambient lighting."
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-hOt5qlRMcCGlkl_BQ1tuMTtVeXU0LXXNSavaP2QdnAGGg9NLjrGh-iACeKkT_6pH0f64RCGxaOXILn5WJomEMcOcYuijrM-SAzqNcHsV8j9VYWyRzuHmGQxCrFqh-ByZD9IeN3BVxwx60s4Z75--5HA0i3hHnKGmuH1jVRn7tfutGYNz2yzV7s88y9-r_z0A0ktd6ETy4AAfITj08F_v_I5G4B5RoqAmkn5AuB_NCsLMoAhe0ASgTVFZVJn8YVYy8Ss__pPqzLU"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                                    <span className="text-white text-xs font-semibold leading-relaxed">
                                        Join 50,000+ professionals optimizing their careers.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Component */}
                <Footer />
            </main>
        </div>
    );
}
