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
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
}

// Sub-component to render the score badge
function ScoreBadge({ score }: { score: number }) {
    const getBadgeStyle = (score: number) => {
        if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
        if (score >= 80) return "bg-indigo-50 text-primary border-indigo-100";
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return "Excellent";
        if (score >= 80) return "Strong";
        return "Average";
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getBadgeStyle(score)}`}>
            {score} {getScoreLabel(score)}
        </span>
    );
}

export default function ScanHistory({
    scans,
    onViewDetails,
    currentPage,
    totalPages,
    totalRecords,
    onPageChange
}: ScanHistoryProps) {
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
                                            <ScoreBadge score={scan.score} />
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end">
                                            <button
                                                onClick={() => onViewDetails(scan)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all active:scale-95 bg-white font-semibold text-xs cursor-pointer"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
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
                                    <ScoreBadge score={scan.score} />
                                    <button
                                        onClick={() => onViewDetails(scan)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all active:scale-95 bg-white font-semibold text-xs cursor-pointer"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
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

            {/* Pagination Controls */}
            {totalRecords > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200/60">
                    <span className="text-xs font-semibold text-slate-500">
                        Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalRecords)} of {totalRecords} resumes
                    </span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
                        >
                            Previous
                        </button>
                        <span className="text-xs font-semibold text-slate-500">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
