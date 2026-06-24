import { FileText, Eye, ChartColumn, Star } from "lucide-react";

interface Scan {
    id: string;
    filename: string;
    date: string;
    time: string;
    score: number;
    overallScore: number;
    atsScore: number;
    strengths: any[];
    weaknesses: any[];
    missingSkills: string[];
    improvements: any[];
    recommendedRoles: any[];
    recruiterSummary?: string;
}

interface DashboardOverviewProps {
    scans: Scan[];
    totalScans: number;
    bestScore: number;
    onViewDetails: (scan: Scan) => void;
    onViewAll: () => void;
}

export default function DashboardOverview({
    scans,
    totalScans,
    bestScore,
    onViewDetails,
    onViewAll
}: DashboardOverviewProps) {
    const latestScan = scans[0];

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
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                <p className="text-sm text-slate-500">Track your resume performance and analysis history.</p>
            </header>

            {/* Stats Section (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Latest Score Card */}
                {latestScan && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 ambient-shadow flex items-center justify-between ambient-shadow-hover transition-all">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latest Score</p>
                            <h2 className="text-4xl font-black text-slate-800">
                                {latestScan.score}
                                <span className="text-sm text-slate-400 font-normal">/100</span>
                            </h2>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-primary border border-indigo-100 mt-3 uppercase tracking-wider">
                                Good performance
                            </span>
                        </div>
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <div
                                className="w-full h-full rounded-full absolute"
                                style={{
                                    background: `conic-gradient(#4f46e5 0% ${latestScan.score}%, #E2E8F0 ${latestScan.score}% 100%)`
                                }}
                            />
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm z-10 text-primary">
                                <ChartColumn className="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Total Scans Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 ambient-shadow ambient-shadow-hover transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                            <Eye className="w-6 h-6" />
                        </div>
                        <span className="text-emerald-600 font-bold text-xs bg-emerald-50/50 px-2 py-1 rounded-lg border border-emerald-100/50">
                            +12% vs last month
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Scans</p>
                    <h2 className="text-4xl font-black text-slate-800">{totalScans}</h2>
                </div>

                {/* Best Score Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 ambient-shadow ambient-shadow-hover transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                            <Star className="w-6 h-6" />
                        </div>
                        <span className="text-amber-600 font-bold text-xs bg-amber-50/50 px-2 py-1 rounded-lg border border-amber-100/50">
                            Top 5% Users
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Best Score</p>
                    <h2 className="text-4xl font-black text-slate-800">{bestScore}</h2>
                </div>
            </div>

            {/* Recent Scans Section */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden ambient-shadow">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Scans</h3>
                    <button
                        onClick={onViewAll}
                        className="text-primary font-bold text-sm hover:underline cursor-pointer bg-transparent border-none"
                    >
                        View All
                    </button>
                </div>
                <div className="divide-y divide-slate-100">
                    {scans.length > 0 ? (
                        scans.slice(0, 3).map((scan) => (
                            <div
                                key={scan.id}
                                className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 border border-slate-100/80 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-primary transition-colors">
                                            {scan.filename}
                                        </h4>
                                        <p className="text-xs text-slate-400 mt-0.5">{scan.date} • {scan.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getScoreBadgeClass(scan.score)}`}>
                                        {scan.score} {getScoreText(scan.score)}
                                    </span>
                                    <button
                                        onClick={() => onViewDetails(scan)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 transition-all active:scale-95 bg-white font-semibold text-xs cursor-pointer"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-slate-400 font-semibold text-sm">
                            No recent scans found. Analyze your resume to get started!
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
