import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import ScanHistory from "../components/dashboard/ScanHistory";
import Footer from "../components/layout/Footer";
import ResumeDetailsModal from "../components/dashboard/ResumeDetailsModal";
import { useUserStore } from "../store";
import "../styles/dashboard.css";

// Interface Definitions
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

interface BackendResume {
    _id: string;
    fileName: string;
    createdAt: string;
    analysis?: {
        overallScore?: number;
        atsScore?: number;
        strengths?: string[];
        weaknesses?: string[];
        missingSkills?: string[];
        improvements?: string[];
        recommendedRoles?: string[];
    };
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<"dashboard" | "history">("dashboard");
    const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [scans, setScans] = useState<Scan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const storeUser = useUserStore((state) => state.user);
    const logoutStore = useUserStore((state) => state.logout);

    // Mock User Data fallback
    const user = storeUser || {
        name: "Aniket Jas",
        email: "aniket@example.com",
    };

    // Fetch user analyses from the API on mount
    useEffect(() => {
        const fetchScans = async () => {
            try {
                const response = await axios.get("/resume/analyses");
                if (response.data.success && response.data.data) {
                    const mappedScans: Scan[] = response.data.data.map((resume: BackendResume) => {
                        const dateObj = new Date(resume.createdAt);
                        const date = dateObj.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        });
                        const time = dateObj.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        });
                        const analysis = resume.analysis || {};
                        const score = analysis.overallScore || 0;
                        return {
                            id: resume._id,
                            filename: resume.fileName || "Resume File",
                            date,
                            time,
                            score,
                            overallScore: analysis.overallScore || 0,
                            atsScore: analysis.atsScore || 0,
                            strengths: analysis.strengths || [],
                            weaknesses: analysis.weaknesses || [],
                            missingSkills: analysis.missingSkills || [],
                            improvements: analysis.improvements || [],
                            recommendedRoles: analysis.recommendedRoles || [],
                        };
                    });
                    setScans(mappedScans);
                }
            } catch (error) {
                console.error("Error fetching scans:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchScans();
    }, []);

    // Navigation Handlers
    const handleCloseModal = (): void => {
        setSelectedScan(null);
    };

    const handleLogout = async (): Promise<void> => {
        try {
            await axios.post("/users/logout");
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            navigate("/", { replace: true });
            setTimeout(() => {
                logoutStore();
            }, 200);
        }
    };

    const handleAnalyseNewResume = (): void => {
        navigate("/upload");
    };

    // Statistics calculations
    const totalScans = scans.length;
    const bestScore = scans.length > 0 ? Math.max(...scans.map(s => s.score)) : 0;


    return (
        <div className="bg-surface text-on-surface min-h-screen font-body-md flex flex-col">
            {/* Top Navbar */}
            <Navbar
                onMenuClick={() => setIsMobileSidebarOpen(true)}
            />

            {/* Sidebar (handles desktop and mobile layout internally) */}
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
                onAnalyseNew={handleAnalyseNewResume}
                onLogout={handleLogout}
                user={user}
            />

            {/* Main Content Area */}
            <main className="md:ml-[280px] pt-[72px] flex-grow flex flex-col">
                <div className="px-6 md:px-10 py-8 max-w-5xl w-full mx-auto flex-grow flex flex-col">

                    {/* View Switching */}
                    {isLoading ? (
                        <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-500 font-semibold gap-3">
                            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                            <span>Loading dashboard data...</span>
                        </div>
                    ) : activeView === "dashboard" ? (
                        <DashboardOverview
                            scans={scans}
                            totalScans={totalScans}
                            bestScore={bestScore}
                            onViewDetails={(scan) => setSelectedScan(scan)}
                            onViewAll={() => setActiveView("history")}
                        />
                    ) : (
                        <ScanHistory
                            scans={scans}
                            onViewDetails={(scan) => setSelectedScan(scan)}
                        />
                    )}

                    {/* Footer Component */}
                    <Footer />
                </div>
            </main>

            {/* Background Decoration Elements */}
            <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] glow-primary opacity-60 rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-[280px] -z-10 w-[400px] h-[400px] glow-secondary opacity-40 rounded-full pointer-events-none" />

            {/* Details Modal overlay */}
            {selectedScan && (
                <ResumeDetailsModal
                    scan={selectedScan}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
