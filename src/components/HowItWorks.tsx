import React, { forwardRef } from "react";
import { LogIn, Upload, BarChart3 } from "lucide-react";

const HowItWorks = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (_props, ref) => {
    return (
      <section
        ref={ref}
        className="py-32 bg-surface-container-lowest"
        id="how-it-works"
      >
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-headline-md font-bold text-on-surface">
              How IntelliResume Works
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Three simple steps to unlock your professional potential and stand
              out to recruiters.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="reveal relative p-10 rounded-card bg-surface hover:shadow-2xl transition-all duration-300 group border border-outline-variant/10 active">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <LogIn className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-headline-sm font-bold mb-4">1. Create Profile</h3>
              <p className="text-on-surface-variant">
                Sign up in seconds and define your target job titles and industry
                preferences.
              </p>
            </div>
            {/* Step 2 */}
            <div
              className="reveal relative p-10 rounded-card bg-surface hover:shadow-2xl transition-all duration-300 group border border-outline-variant/10 active"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Upload className="text-secondary w-8 h-8" />
              </div>
              <h3 className="text-headline-sm font-bold mb-4">2. Upload Resume</h3>
              <p className="text-on-surface-variant">
                Drag and drop your PDF or DOCX file. Our engine parses the data
                with 99.9% accuracy.
              </p>
            </div>
            {/* Step 3 */}
            <div
              className="reveal relative p-10 rounded-card bg-surface hover:shadow-2xl transition-all duration-300 group border border-outline-variant/10 active"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                <BarChart3 className="text-on-primary w-8 h-8" />
              </div>
              <h3 className="text-headline-sm font-bold mb-4">3. Get Results</h3>
              <p className="text-on-surface-variant">
                Receive a detailed breakdown, ATS scores, and actionable feedback
                to improve your ranking.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HowItWorks.displayName = "HowItWorks";

export default HowItWorks;
