import { Brain, Globe } from "lucide-react";
import Github from "../assets/Github";
import LinkedIn from "../assets/LinkedIn";

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-surface-dim border-t border-outline-variant/20 py-16">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 items-start mb-12">
          <div className="space-y-6 text-center flex flex-col items-center mx-auto">
            <div className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
              <Brain className="text-primary w-8 h-8" />
              <span>IntelliResume</span>
            </div>
            <p className="text-on-surface-variant max-w-xs">
              Precision-engineered for elite recruiters and high-performing
              candidates.
            </p>
            {/* Social Buttons */}
            <div className="flex gap-4 mt-4 justify-center">
              <a
                href="https://github.com/AniketJas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-primary text-on-surface-variant transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aniket-jas/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-primary text-on-surface-variant transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
                aria-label="LinkedIn Profile"
              >
                <LinkedIn className="w-5 h-5" />
              </a>
              <a
                href="https://aniket-jas-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-surface-container hover:bg-primary-fixed hover:text-primary text-on-surface-variant transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
                aria-label="Portfolio Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-label-sm text-on-surface-variant">
          <p>© 2026 IntelliResume. Precision-engineered for elite recruiters.</p>
          <p>
            Made by <span className="font-bold text-on-surface">Aniket Jas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
