import { Sparkles, Check, Tag, Zap } from "lucide-react";

interface HeroProps {
  handleGetStarted: () => void;
}

export default function Hero({ handleGetStarted }: HeroProps) {
  return (
    <main className="relative min-h-screen pt-32 flex flex-col justify-center overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Hero Left */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-label-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-sm" />
            <span>✨ AI-POWERED RESUME ANALYSIS</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Get Your Resume <br />
            <span className="text-primary italic">Analyzed Like a Recruiter</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg">
            Stop guessing why you aren't getting interviews. Our elite AI engine
            scans your resume through the eyes of top-tier recruiters and modern
            ATS systems.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-body-md font-medium text-on-surface">
              <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center">
                <Check className="w-3 h-3 text-on-secondary-container" />
              </div>
              Real-time ATS Score Comparison
            </li>
            <li className="flex items-center gap-3 text-body-md font-medium text-on-surface">
              <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center">
                <Check className="w-3 h-3 text-on-secondary-container" />
              </div>
              LSI Keyword Optimization for JDs
            </li>
            <li className="flex items-center gap-3 text-body-md font-medium text-on-surface">
              <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center">
                <Check className="w-3 h-3 text-on-secondary-container" />
              </div>
              Dynamic Skill Gap Analysis
            </li>
            <li className="flex items-center gap-3 text-body-md font-medium text-on-surface">
              <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center">
                <Check className="w-3 h-3 text-on-secondary-container" />
              </div>
              Psychometric Recruiter Insights
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={handleGetStarted}
              className="bg-primary-container text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Analyze Your Resume"
            >
              Analyze Your Resume
            </button>
          </div>
        </div>
        {/* Hero Right */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Floating Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main Resume Mockup */}
            <div className="relative z-10 w-80 h-auto p-4 rounded-card bg-white shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500 transform-gpu cursor-pointer">
              <img
                className="w-full rounded-lg"
                alt="A clean, professional minimalist resume layout with high-end typography and structured sections, displayed as a physical document on a clean surface. The aesthetic is modern corporate with blue and grey accents."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd3ce-L9lC--uHT5hT0Fn7IY1oTKVvA274AvSOLJti0Rs0CXdoCglWb4HXdpRpm4y9R9D1aysJlnT9ieV0HgoIWL2bH6XfPWC-rQl6UwBxJr4SXQgWWYbppqiFjkFg7pErR9SNbr8SwBc2q-hUV_snI45K6CIu1xEq7bRwI2KkYmBpc3WLupIWRDz0NjPNxGK0CnziC9j97Ea2rGgH9r-W7b07ux15GJMdfgJLiJx5qqmr5ZJq2lboBR2qZdMEgB6iWfEi_c9Q6fc"
              />
            </div>
            {/* Floating Card: ATS Score */}
            <div
              className="absolute top-10 right-0 z-20 glass-card p-6 rounded-card shadow-xl animate-float"
              style={{ "--tw-rotate": "-3deg" } as React.CSSProperties}
            >
              <p className="text-label-sm text-on-surface-variant font-bold uppercase mb-2">
                ATS Compatibility
              </p>
              <div className="flex items-end gap-2">
                <span className="text-headline-md font-bold text-primary">92</span>
                <span className="text-body-sm text-on-surface-variant mb-1">/100</span>
              </div>
              <div className="w-32 h-2 bg-surface-container rounded-full mt-3 overflow-hidden">
                <div className="w-[92%] h-full bg-primary"></div>
              </div>
            </div>
            {/* Floating Card: Keyword Match */}
            <div
              className="absolute bottom-20 -left-10 z-20 glass-card p-6 rounded-card shadow-xl animate-float"
              style={{ animationDelay: "1.5s", "--tw-rotate": "2deg" } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary-container/20 rounded-lg">
                  <Tag className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-bold text-body-md">Keywords</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold">
                  Cloud Architecture
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold">
                  Python
                </span>
                <span className="px-3 py-1 bg-error-container text-on-error-container text-xs rounded-full font-bold">
                  Kubernetes (Missing)
                </span>
              </div>
            </div>
            {/* Floating Card: AI Suggestions */}
            <div
              className="absolute bottom-0 right-10 z-20 glass-card p-6 rounded-card shadow-xl animate-float"
              style={{ animationDelay: "3s", "--tw-rotate": "-1deg" } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <Zap className="text-primary w-5 h-5 fill-primary" />
                <span className="font-bold">AI Suggestion</span>
              </div>
              <p className="text-body-sm mt-2 text-on-surface-variant">
                "Add quantitative results to your <br />Senior Developer
                role..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
