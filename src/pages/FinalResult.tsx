import React, { useState, useEffect } from "react";
import {
  Download,
  Brain,
  ThumbsUp,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  List,
  Sparkles,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/finalResult.css";

interface Strength {
  title: string;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
}

interface RecommendedRole {
  role: string;
  matchPercentage: number;
}

interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  strengths: Strength[];
  improvements: Improvement[];
  missingSkills: string[];
  recommendedRoles: RecommendedRole[];
}

const mockAnalysisResult: AnalysisResult = {
  overallScore: 85,
  atsScore: 78,
  strengths: [
    {
      title: "Design System Mastery",
      description: "Exceptional articulation of complex Figma workflows."
    },
    {
      title: "Accessibility Focus",
      description: "Strong emphasis on WCAG 2.1 compliance and inclusive design."
    }
  ],
  improvements: [
    {
      title: "Quantify Your Impact",
      description: 'Use percentages (e.g., "Increased conversion by 12%") instead of generic tasks.'
    },
    {
      title: "Leadership Keywords",
      description: 'Include more "Mentorship" and "Stakeholder Management" keywords.'
    }
  ],
  missingSkills: ["Interaction Design", "User Research", "Product Analytics"],
  recommendedRoles: [
    { role: "Sr. UX Designer", matchPercentage: 95 },
    { role: "Product Architect", matchPercentage: 88 },
    { role: "Design Ops Lead", matchPercentage: 82 },
    { role: "Creative Director", matchPercentage: 75 },
    { role: "Staff Product Designer", matchPercentage: 72 }
  ]
};

export default function FinalResult(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const rawAnalysis = location.state?.analysis;
  const fileName = location.state?.fileName || "Senior_Product_Designer_V3.pdf";

  const parseList = (items: unknown[]): Strength[] => {
    if (!items) return [];
    return items.map((item) => {
      if (typeof item === "string") {
        const parts = item.split(/[:-]/);
        if (parts.length > 1) {
          return {
            title: parts[0].trim(),
            description: parts.slice(1).join(":").trim()
          };
        }
        return {
          title: item,
          description: ""
        };
      }
      const obj = (item as { title?: string; description?: string }) || {};
      return {
        title: obj.title || "",
        description: obj.description || ""
      };
    });
  };

  const parseRecommendedRoles = (roles: unknown[]): RecommendedRole[] => {
    if (!roles) return [];
    const defaultPercentages = [95, 88, 82, 75, 72];
    return roles.map((role, index) => {
      if (typeof role === "string") {
        return {
          role,
          matchPercentage: defaultPercentages[index % defaultPercentages.length]
        };
      }
      const obj = (role as { role?: string; matchPercentage?: number }) || {};
      return {
        role: obj.role || "",
        matchPercentage: obj.matchPercentage || defaultPercentages[index % defaultPercentages.length]
      };
    });
  };

  const parsedAnalysis: AnalysisResult = rawAnalysis
    ? {
        overallScore: rawAnalysis.overallScore || 0,
        atsScore: rawAnalysis.atsScore || 0,
        strengths: parseList(rawAnalysis.strengths || []),
        improvements: parseList(rawAnalysis.improvements || rawAnalysis.weaknesses || []),
        missingSkills: rawAnalysis.missingSkills || [],
        recommendedRoles: parseRecommendedRoles(rawAnalysis.recommendedRoles || [])
      }
    : mockAnalysisResult;

  const recruiterSummary =
    rawAnalysis?.recruiterSummary ||
    "Expertly tailored for Senior Product Design roles. Strengths include system architecture and accessibility. Weaknesses identified in quantitative impact metrics.";

  const topRole = rawAnalysis?.recommendedRoles?.[0] || "Staff UI Engineer";
  const displayTopRole = typeof topRole === "string" ? topRole : topRole?.role || "Staff UI Engineer";

  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [animatedAtsScore, setAnimatedAtsScore] = useState<number>(0);

  useEffect(() => {
    const end = parsedAnalysis.overallScore;
    if (end === 0) {
      setTimeout(() => setAnimatedScore(0), 0);
      return;
    }

    let start = 0;
    const totalDuration = 800; // 0.8 seconds
    const incrementTime = Math.max(1, Math.floor(totalDuration / end));

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(Math.min(start, end));
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [parsedAnalysis.overallScore]);

  useEffect(() => {
    const end = parsedAnalysis.atsScore;
    if (end === 0) {
      setTimeout(() => setAnimatedAtsScore(0), 0);
      return;
    }

    let start = 0;
    const totalDuration = 800; // 0.8 seconds
    const incrementTime = Math.max(1, Math.floor(totalDuration / end));

    const timer = setInterval(() => {
      start += 1;
      setAnimatedAtsScore(Math.min(start, end));
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [parsedAnalysis.atsScore]);

  const handleAnalyzeAnotherResume = (): void => {
    navigate("/upload");
  };

  const handleDownloadReport = (): void => {
    window.print();
  };

  const handleViewDetailedInsights = (): void => {
    const section = document.getElementById("detailed-analysis-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToDashboard = (): void => {
    navigate("/dashboard");
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col print:bg-white print:text-black">
      {/* Navbar component */}
      <div className="print:hidden">
        <Navbar onMenuClick={() => {}} />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto w-full print:pt-4 print:pb-4">
        
        {/* Breadcrumb & Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 fade-in-card">
          <div>
            <nav className="flex items-center gap-2 mb-2 print:hidden" aria-label="Breadcrumb">
              <button 
                onClick={handleBackToDashboard}
                className="font-label-sm text-xs font-semibold text-slate-500 hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Dashboard
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="font-label-sm text-xs font-semibold text-primary">
                Resume Analysis Report
              </span>
            </nav>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Resume Analysis Report
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Generated on {formattedDate} for "{fileName}"
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={handleAnalyzeAnotherResume}
              className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200/60 text-primary font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all active:scale-95 duration-200"
            >
              Analyze Another Resume
            </button>
            <button
              type="button"
              onClick={handleDownloadReport}
              className="flex-1 md:flex-none px-6 py-3 bg-primary text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 ambient-shadow hover:-translate-y-0.5 transition-all active:scale-95 duration-200"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Scores Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-3xl p-8 ambient-shadow fade-in-card delay-100">
            <div className="flex flex-col md:flex-row items-center gap-10">
              
              {/* Circular Score */}
              <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
                <div
                  className="circular-progress w-full h-full rounded-full flex items-center justify-center rotate-[-90deg]"
                  style={{
                    background: `conic-gradient(from 0deg, #3525cd 0% ${animatedScore}%, #eaedff ${animatedScore}% 100%)`
                  }}
                >
                  <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center rotate-[90deg]">
                    <span className="text-5xl font-black text-primary leading-none">
                      {animatedScore}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Overall Score
                    </span>
                  </div>
                </div>
                {/* Ambient glow effect */}
                <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
              </div>

              {/* ATS Score & Quick Metrics */}
              <div className="flex-1 w-full">
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xl font-bold text-slate-800">
                      ATS Compatibility
                    </span>
                    <span className="text-xl font-bold text-cyan-600">
                      {animatedAtsScore}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${animatedAtsScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    Your resume is highly optimized for modern Applicant Tracking Systems. Minor formatting adjustments could reach 90%+.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="lg:col-span-4 bg-primary text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden fade-in-card delay-200 shadow-lg">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Summary</h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                {recruiterSummary}
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">
                Top Role: {displayTopRole}
              </span>
              <button
                type="button"
                onClick={handleViewDetailedInsights}
                className="w-full py-3 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-colors"
              >
                View Detailed Insights
              </button>
            </div>
            {/* Abstract pattern overlay */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* Detailed Analysis Sections */}
          <div id="detailed-analysis-section" className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24">
            
            {/* Strengths */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 ambient-shadow-hover fade-in-card delay-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Key Strengths</h4>
              </div>
              <ul className="space-y-6">
                {parsedAnalysis.strengths.length > 0 ? (
                  parsedAnalysis.strengths.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm text-slate-800">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No major strengths highlighted.</p>
                )}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 ambient-shadow-hover fade-in-card delay-400">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Improvements</h4>
              </div>
              <ul className="space-y-6">
                {parsedAnalysis.improvements.length > 0 ? (
                  parsedAnalysis.improvements.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm text-slate-800">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No major improvements identified.</p>
                )}
              </ul>
            </div>

            {/* Missing Skills */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 ambient-shadow-hover fade-in-card delay-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-primary">
                  <List className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Skill Gaps</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {parsedAnalysis.missingSkills.length > 0 ? (
                  parsedAnalysis.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-50 text-slate-700 rounded-full text-xs font-semibold border border-slate-200/60"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No critical missing skills found.</p>
                )}
              </div>
              <div className="mt-6 p-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl">
                <p className="text-xs font-bold text-cyan-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  Strategy Tip
                </p>
                <p className="text-xs text-cyan-800 mt-1 leading-relaxed">
                  Adding skills listed under "Skill Gaps" to your resume will boost your ATS score.
                </p>
              </div>
            </div>

            {/* Recommended Roles */}
            <div className="md:col-span-2 lg:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-8 ambient-shadow fade-in-card delay-500">
              <h4 className="text-lg font-bold text-slate-800 mb-6">Recommended Career Paths</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {parsedAnalysis.recommendedRoles.length > 0 ? (
                  parsedAnalysis.recommendedRoles.map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-primary transition-all cursor-default"
                    >
                      <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                        {item.matchPercentage}% Match
                      </span>
                      <p className="font-bold text-sm text-slate-800 mt-1">{item.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 col-span-full">No career recommendation paths returned.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6 fade-in-card delay-500">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 font-bold text-sm text-slate-500 hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
