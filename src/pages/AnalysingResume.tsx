import React, { useState, useEffect, useRef } from "react";
import { Check, Loader2, Clock3 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/analysingResume.css";

const statusMessages = [
  "Scanning keywords...",
  "Identifying core skills...",
  "Contextualizing experience...",
  "Mapping career trajectory...",
  "Checking ATS compatibility...",
  "Analyzing semantic depth...",
  "Optimizing impact verbs...",
  "Calculating precision score..."
];

export default function AnalysingResume(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file as File | undefined;

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);
  const analysisProgress = 66; // 66% represented visually

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!file) {
      navigate("/upload");
      return;
    }

    if (hasStartedRef.current) return;
    if (isAnalyzing) return;

    hasStartedRef.current = true;
    setTimeout(() => {
      setIsAnalyzing(true);
    }, 0);

    const abortController = new AbortController();
    let isSubscribed = true;

    const performAnalysis = async () => {
      console.log("Calling /resume/analyze");
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const response = await axios.post("/resume/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          signal: abortController.signal
        });
        if (isSubscribed) {
          console.log("Extraction and Analysis Result:", response.data);
          navigate("/result", {
            state: {
              analysis: response.data?.data?.analysis,
              fileName: file.name
            }
          });
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Analysis request aborted on unmount");
          return;
        }
        if (isSubscribed) {
          console.error("Upload error during analysis:", error);
          const err = error as { response?: { data?: { error?: string } } };
          const errorMessage = err.response?.data?.error || "Failed to upload and analyze resume.";
          navigate("/upload", { state: { error: errorMessage } });
        }
      }
    };

    performAnalysis();

    return () => {
      isSubscribed = false;
      abortController.abort();
      hasStartedRef.current = false;
      setIsAnalyzing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, navigate]);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => { }} />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-[72px] px-6 md:px-0">
        <div className="w-full max-w-4xl flex flex-col items-center text-center py-8">

          {/* AI Scanning Illustration Container */}
          <div className="relative w-64 h-80 mb-8 float-animation" aria-hidden="true">
            {/* Background Decorative Glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl"></div>

            {/* The "Document" Surface */}
            <div className="absolute inset-0 bg-white border border-slate-200/60 rounded-2xl shadow-xl overflow-hidden flex flex-col p-6">
              {/* Fake Document Content */}
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-slate-50 rounded-full"></div>
                </div>
                <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                </div>
                <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-4/5 bg-slate-50 rounded-full"></div>
                </div>
              </div>

              {/* Scan Line Overlay */}
              <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none">
                <div className="scan-line w-full h-1/3 opacity-40"></div>
              </div>

              {/* Digital Data Particles */}
              <div className="absolute bottom-4 right-4 flex gap-1 items-end h-8">
                <div className="w-1 bg-primary/20 rounded-full h-4 animate-pulse"></div>
                <div className="w-1 bg-primary/40 rounded-full h-8 animate-pulse [animation-delay:75ms]"></div>
                <div className="w-1 bg-primary/30 rounded-full h-6 animate-pulse [animation-delay:150ms]"></div>
              </div>
            </div>

            {/* Abstract AI Orbitals */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-primary/20 orbital-spin">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(53,37,205,0.6)]"></div>
            </div>
            <div className="absolute -bottom-4 -left-8 w-24 h-24 rounded-full border border-cyan-500/20 orbital-spin-reverse">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>
            </div>
          </div>

          {/* Header Section */}
          <div className="space-y-2 mb-8 px-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
              Analyzing Your Resume
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Our proprietary AI engine is meticulously cross-referencing your credentials against 1.2M+ industry-leading profiles to maximize your career impact.
            </p>
          </div>

          {/* Analysis Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-6" role="status" aria-label="Analysis checklist progress">

            {/* Step 1: Done */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-left shadow-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="font-bold text-sm text-slate-800">Resume Uploaded</span>
            </div>

            {/* Step 2: Done */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-left shadow-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="font-bold text-sm text-slate-800">Extracting Content</span>
            </div>

            {/* Step 3: In Progress */}
            <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl text-left check-step-active shadow-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-spin flex-shrink-0">
                <Loader2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-primary">Industry Benchmarking</span>
            </div>

            {/* Step 4: Pending */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200/60 rounded-2xl text-left opacity-60 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                <Clock3 className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-slate-400">Generating Recommendations</span>
            </div>
          </div>

          {/* Dynamic Status Text Area */}
          <div className="mt-8 h-8 flex items-center justify-center" aria-live="polite">
            <p className="text-xs font-bold tracking-widest text-primary uppercase status-fade-in">
              {statusMessages[currentMessageIndex]}
            </p>
          </div>

          {/* Ambient Progress Bar */}
          <div className="w-full max-w-md bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden px-0">
            <div
              className="h-full bg-primary shadow-[0_0_8px_#3525cd] transition-all duration-500 ease-out"
              style={{ width: `${analysisProgress}%` }}
              role="progressbar"
              aria-valuenow={analysisProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
