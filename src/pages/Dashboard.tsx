import { useState } from "react";
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
    id: number;
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

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<"dashboard" | "history">("dashboard");
    const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const storeUser = useUserStore((state) => state.user);
    const logoutStore = useUserStore((state) => state.logout);

    // Mock User Data fallback
    const user = storeUser || {
        name: "Aniket Jas",
        email: "aniket@example.com",
    };

    // Mock Scan History
    const scans: Scan[] = [
        {
            id: 1,
            filename: "Product_Manager_Resume_v4.pdf",
            date: "24 Jun 2026",
            time: "10:45 AM",
            score: 92,
            overallScore: 92,
            atsScore: 88,
            strengths: [
                "Strong technical skills",
                "Good ATS formatting",
                "quantified key achievements",
            ],
            weaknesses: [
                "Weak summary section",
            ],
            missingSkills: [
                "Docker",
                "AWS",
            ],
            improvements: [
                "Add quantified achievements",
            ],
            recommendedRoles: [
                "Full Stack Developer",
                "Backend Developer",
            ],
        },
        {
            id: 2,
            filename: "Software_Engineer_Google_App.pdf",
            date: "22 Jun 2026",
            time: "10:45 AM",
            score: 85,
            overallScore: 85,
            atsScore: 78,
            strengths: [
                "Clear experience layout",
                "Highly detailed bullet points",
            ],
            weaknesses: [
                "Too many pages",
            ],
            missingSkills: [
                "Kubernetes",
                "TypeScript",
            ],
            improvements: [
                "Condense to a single page",
            ],
            recommendedRoles: [
                "Frontend Engineer",
                "Software Architect",
            ],
        },
        {
            id: 3,
            filename: "General_Business_Resume_Oct2024.pdf",
            date: "19 Jun 2026",
            time: "4:20 PM",
            score: 78,
            overallScore: 78,
            atsScore: 72,
            strengths: [
                "Relevant leadership history",
            ],
            weaknesses: [
                "Lacks structural consistency",
            ],
            missingSkills: [
                "Excel",
                "SQL",
            ],
            improvements: [
                "Align margins and fonts",
            ],
            recommendedRoles: [
                "Business Analyst",
                "Project Lead",
            ],
        }
    ];

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
            logoutStore();
            navigate("/");
        }
    };

    const handleAnalyseNewResume = (): void => {
        navigate("/upload");
    };

    // Statistics calculations
    const totalScans = 24;
    const bestScore = Math.max(...scans.map(s => s.score));

    return (
        <div className="bg-surface text-on-surface min-h-screen font-body-md flex flex-col">
            {/* Top Navbar */}
            <Navbar
                onMenuClick={() => setIsMobileSidebarOpen(true)}
                onLogout={handleLogout}
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
                    {activeView === "dashboard" ? (
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
