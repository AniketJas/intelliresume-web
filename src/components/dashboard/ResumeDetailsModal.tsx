import { useEffect, useState } from "react";
import { X, Download, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Briefcase, Loader2 } from "lucide-react";
import axios from "axios";

interface Scan {
    id: string;
    filename: string;
    date: string;
    time: string;
    score: number;
    overallScore: number;
    atsScore: number;
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    improvements: string[];
    recommendedRoles: string[];
}

interface ResumeDetailsModalProps {
    scan: Scan | null;
    onClose: () => void;
}

export default function ResumeDetailsModal({ scan, onClose }: ResumeDetailsModalProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadReport = async (): Promise<void> => {
        if (isDownloading || !scan) return;
        setIsDownloading(true);
        try {
            const response = await axios.get(`/resume/${scan.id}/download-report`, {
                responseType: "blob",
            });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `analysis-report-${scan.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading report:", error);
            alert("Failed to download the analysis report.");
        } finally {
            setIsDownloading(false);
        }
    };

    // Close on ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!scan) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Modal Box */}
            <div className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white rounded-none md:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div>
                        <h2 id="modal-title" className="text-xl font-bold text-slate-800 tracking-tight truncate max-w-[280px] sm:max-w-lg">
                            {scan.filename}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Analyzed on {scan.date} at {scan.time}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadReport}
                            disabled={isDownloading}
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-1.5 active:scale-95 bg-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Download Report"
                            aria-label="Download Report"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="hidden sm:inline">Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center active:scale-95"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="flex-grow p-6 overflow-y-auto space-y-8">
                    {/* Score Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        {/* Circular Progress Chart */}
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* Conic gradient backdrop styled dynamically */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(#4f46e5 0% ${scan.overallScore}%, #E2E8F0 ${scan.overallScore}% 100%)`
                                    }}
                                />
                                <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-slate-800">{scan.overallScore}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall</span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-600 mt-3">Overall Resume Score</span>
                        </div>

                        {/* ATS & Metrics Section */}
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-sm font-semibold text-slate-700">ATS Compatibility Score</span>
                                    <span className="text-sm font-bold text-primary">{scan.atsScore}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${scan.atsScore}%` }}
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed">
                                Our AI checked your resume against core ATS parsers. Improving missing skills and structural layout will increase your matching potential.
                            </p>
                        </div>
                    </div>

                    {/* Details Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Strengths Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-emerald-600 pb-2 border-b border-slate-100">
                                <CheckCircle2 className="w-5 h-5" />
                                <h3 className="font-bold text-sm tracking-wide uppercase">Strengths</h3>
                            </div>
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {scan.strengths.length > 0 ? (
                                    scan.strengths.map((str, idx) => (
                                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>{str}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No key strengths detected.</p>
                                )}
                            </ul>
                        </div>

                        {/* Weaknesses Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-rose-600 pb-2 border-b border-slate-100">
                                <XCircle className="w-5 h-5" />
                                <h3 className="font-bold text-sm tracking-wide uppercase">Weaknesses</h3>
                            </div>
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {scan.weaknesses.length > 0 ? (
                                    scan.weaknesses.map((weak, idx) => (
                                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="text-rose-500 mt-1">•</span>
                                            <span>{weak}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No major weaknesses detected.</p>
                                )}
                            </ul>
                        </div>

                        {/* Missing Skills Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-amber-600 pb-2 border-b border-slate-100">
                                <AlertTriangle className="w-5 h-5" />
                                <h3 className="font-bold text-sm tracking-wide uppercase">Missing Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                                {scan.missingSkills.length > 0 ? (
                                    scan.missingSkills.map((skill, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No missing skills flagged.</p>
                                )}
                            </div>
                        </div>

                        {/* Improvements Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-sky-600 pb-2 border-b border-slate-100">
                                <TrendingUp className="w-5 h-5" />
                                <h3 className="font-bold text-sm tracking-wide uppercase">Suggested Improvements</h3>
                            </div>
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {scan.improvements.length > 0 ? (
                                    scan.improvements.map((imp, idx) => (
                                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="text-sky-500 mt-1">•</span>
                                            <span>{imp}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No recommendations needed.</p>
                                )}
                            </ul>
                        </div>

                        {/* Recommended Roles Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm md:col-span-2 space-y-3">
                            <div className="flex items-center gap-2 text-indigo-600 pb-2 border-b border-slate-100">
                                <Briefcase className="w-5 h-5" />
                                <h3 className="font-bold text-sm tracking-wide uppercase">Recommended Roles</h3>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {scan.recommendedRoles.length > 0 ? (
                                    scan.recommendedRoles.map((role, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-xl text-xs font-bold">
                                            {role}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">No role recommendations found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
