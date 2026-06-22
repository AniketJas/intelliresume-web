interface CTAProps {
  handleGetStarted: () => void;
}

export default function CTA({ handleGetStarted }: CTAProps) {
  return (
    <section className="py-24 px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="relative rounded-[40px] bg-primary text-on-primary overflow-hidden px-10 py-20 text-center space-y-8">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-headline-md md:text-headline-lg font-bold leading-tight">
              Ready to Land More Interviews?
            </h2>
            <p className="text-body-lg text-on-primary-container opacity-90">
              Join 10,000+ professionals who have optimized their resumes for
              the future of recruiting.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleGetStarted}
                className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                aria-label="Get Started Free"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
