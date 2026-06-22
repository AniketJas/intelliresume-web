import React, { forwardRef } from "react";
import { Settings2, Key, LineChart, MessageSquare } from "lucide-react";

const Features = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (_props, ref) => {
    return (
      <section ref={ref} className="py-32 overflow-hidden" id="features">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-headline-md font-bold text-on-surface">
                  Precision-Engineered <br />for Elite Careers
                </h2>
                <p className="text-body-lg text-on-surface-variant">
                  We don't just scan for keywords. We evaluate context, hierarchy,
                  and semantic relevance.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Feature Card 1 */}
                <div className="p-8 rounded-card glass-card hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-primary">
                  <Settings2 className="text-primary mb-4 w-6 h-6" />
                  <h4 className="font-bold text-body-lg mb-2">ATS Compatibility</h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Tested against Greenhouse, Workday, and Lever parsers.
                  </p>
                </div>
                {/* Feature Card 2 */}
                <div className="p-8 rounded-card glass-card hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-secondary">
                  <Key className="text-secondary mb-4 w-6 h-6" />
                  <h4 className="font-bold text-body-lg mb-2">
                    Keyword Optimization
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Identify hard and soft skill gaps based on live job market
                    data.
                  </p>
                </div>
                {/* Feature Card 3 */}
                <div className="p-8 rounded-card glass-card hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-tertiary">
                  <LineChart className="text-tertiary mb-4 w-6 h-6" />
                  <h4 className="font-bold text-body-lg mb-2">Skill Gap Analysis</h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Visual heatmaps showing where your experience exceeds or
                    trails industry norms.
                  </p>
                </div>
                {/* Feature Card 4 */}
                <div className="p-8 rounded-card glass-card hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-primary-container">
                  <MessageSquare className="text-primary-container mb-4 w-6 h-6" />
                  <h4 className="font-bold text-body-lg mb-2">AI Feedback</h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Tailored rewrite suggestions that maintain your unique
                    professional voice.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative reveal active">
              <div className="w-full aspect-square rounded-[48px] bg-primary/5 flex items-center justify-center p-8 border border-primary/10">
                <img
                  className="w-full h-full object-contain drop-shadow-2xl"
                  alt="A sophisticated data visualization dashboard showing resume analytics, keyword match percentage rings, and a glowing heat map of candidate skills against a clean white background. High-tech, clean, and professional aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwfzXtyfhTI2vqZO_MdCp3Pi765kEoj_0WEaAk5gskWiNhigNuoIltvPf6JcIFiRS7Qp7EwbOqqP1WEZyzqWgxww3mTxvusWHk9L5un7nvrHgEou801KFyFXGt0n8croz_jk9HY639loDNNrHGauZNcHsyPBq6mh84Vr0gPDxew1IjtvXIOqnpwOpOEP9yXmmYlwUFWjmMD9VbkiwJ-H6T7ZAND8h6UQdq-Icmk77CL4CvQFOxtg7wCRlVWm-o48UxXLy2SGIM500"
                />
              </div>
              {/* Decorative blur */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Features.displayName = "Features";

export default Features;
