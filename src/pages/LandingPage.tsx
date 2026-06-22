import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import "../styles/landingPage.css";

export default function LandingPage(): React.JSX.Element {
    const navigate = useNavigate();
    const featuresRef = useRef<HTMLElement | null>(null);
    const howItWorksRef = useRef<HTMLElement | null>(null);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleGetStarted = () => navigate("/register");

    const handleFeaturesNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleHowItWorksNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary-fixed selection:text-primary">
            <TopNavBar
                isScrolled={isScrolled}
                handleHowItWorksNavigation={handleHowItWorksNavigation}
                handleFeaturesNavigation={handleFeaturesNavigation}
                handleGetStarted={handleGetStarted}
            />
            <Hero handleGetStarted={handleGetStarted} />
            <HowItWorks ref={howItWorksRef} />
            <Features ref={featuresRef} />
            <CTA handleGetStarted={handleGetStarted} />
            <Footer />
        </div>
    );
}
