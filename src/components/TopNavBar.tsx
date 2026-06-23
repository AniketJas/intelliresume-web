import React from "react";
import { Brain } from "lucide-react";

interface TopNavBarProps {
  isScrolled: boolean;
  handleHowItWorksNavigation: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleFeaturesNavigation: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleGetStarted: () => void;
  handleSignIn: () => void;
  isAuthenticated: boolean;
  username: string;
  handleGoToDashboard: () => void;
}

export default function TopNavBar({
  isScrolled,
  handleHowItWorksNavigation,
  handleFeaturesNavigation,
  handleGetStarted,
  handleSignIn,
  isAuthenticated,
  username,
  handleGoToDashboard,
}: TopNavBarProps) {
  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 transition-shadow duration-200 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-20">
        <div className="text-headline-sm font-bold text-primary flex items-center gap-2">
          <Brain className="text-primary w-8 h-8" />
          <span className="tracking-tight">IntelliResume</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-on-surface-variant font-medium hover:text-primary hover:scale-105 transition-all duration-200 text-label-md"
            href="#how-it-works"
            onClick={handleHowItWorksNavigation}
          >
            How it Works
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary hover:scale-105 transition-all duration-200 text-label-md"
            href="#features"
            onClick={handleFeaturesNavigation}
          >
            Features
          </a>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm text-slate-700 bg-indigo-50/50 px-4 py-2.5 rounded-2xl border border-indigo-100/50">
              Welcome, {username}
            </span>
            <button
              type="button"
              onClick={handleGoToDashboard}
              className="bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 text-label-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              aria-label="Go to Dashboard"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSignIn}
              className="text-slate-700 hover:text-primary font-bold px-4 py-2.5 rounded-full transition-all duration-200 text-label-md focus:outline-none cursor-pointer"
              aria-label="Sign In"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleGetStarted}
              className="bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 text-label-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
