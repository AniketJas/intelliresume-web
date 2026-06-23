import { FileText, Eye } from "lucide-react";

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

interface ScanHistoryProps {
    scans: Scan[];
    onViewDetails: (scan: Scan) => void;
}

export default function ScanHistory({ scans, onViewDetails }: ScanHistoryProps) {
    const getScoreBadgeClass = (score: number) => {
        if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
        if (score >= 80) return "bg-indigo-50 text-primary border-indigo-100";
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    const getScoreText = (score: number) => {
        if (score >= 90) return "Excellent";
        if (score >= 80) return "Strong";
        return "Average";
    };

    return (
        <div className="space-y-8 flex-grow">
            {/* Header Section */}
            <header className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Scan History</h1>
                <p className="text-sm text-slate-500">View and manage all your past resume scans.</p>
            </header>

            {/* History Table / Responsive cards */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden ambient-shadow">
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Filename</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scans.length > 0 ? (
                                scans.map((scan) => (
                                    <tr key={scan.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-primary group-hover:scale-105 transition-transform" />
                                                <span className="font-semibold text-slate-800">{scan.filename}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {scan.date} at {scan.time}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getScoreBadgeClass(scan.score)}`}>
                                                {scan.score} {getScoreText(scan.score)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => onViewDetails(scan)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all active:scale-95 bg-white font-semibold text-xs cursor-pointer"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-semibold text-sm">
                                        No scan history found. Analyze your resume to get started!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List Cards */}
                <div className="sm:hidden divide-y divide-slate-100">
                    {scans.length > 0 ? (
                        scans.map((scan) => (
                            <div key={scan.id} className="p-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-slate-800 text-sm truncate">{scan.filename}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">{scan.date} at {scan.time}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getScoreBadgeClass(scan.score)}`}>
                                        {scan.score} {getScoreText(scan.score)}
                                    </span>
                                    <button
                                        onClick={() => onViewDetails(scan)}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all active:scale-95 bg-white font-semibold text-xs cursor-pointer"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-slate-400 font-semibold text-sm">
                            No scan history found. Analyze your resume to get started!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
