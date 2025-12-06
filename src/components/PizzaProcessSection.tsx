"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const STEP_1_END = 0.33;
const STEP_2_END = 0.66;

export default function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const sectionEl = sectionRef.current;
        const videoEl = videoRef.current;

        if (!sectionEl || !videoEl) return;

        const ctx = gsap.context(() => {
            // Initial state for steps
            stepRefs.current.forEach((step) => {
                if (step) gsap.set(step, { opacity: 0.3, scale: 0.95 });
            });

            // Handle reduced motion
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                // Static fallback
                if (videoEl.readyState >= 1) {
                    videoEl.currentTime = videoEl.duration * 0.9; // Show end frame
                } else {
                    videoEl.addEventListener("loadedmetadata", () => {
                        videoEl.currentTime = videoEl.duration * 0.9;
                    });
                }

                // Simple fade in on scroll for steps
                stepRefs.current.forEach((step) => {
                    if (step) {
                        gsap.to(step, {
                            opacity: 1,
                            scale: 1,
                            scrollTrigger: {
                                trigger: step,
                                start: "top bottom-=10%",
                                toggleActions: "play none none reverse",
                            }
                        });
                    }
                });
                return;
            }

            // Main ScrollTrigger logic
            const onLoaded = () => {
                const duration = videoEl.duration || 1;

                ScrollTrigger.matchMedia({
                    // Desktop
                    "(min-width: 768px)": function () {
                        ScrollTrigger.create({
                            trigger: sectionEl,
                            pin: true,
                            start: "top top",
                            end: "bottom+=200% top",
                            scrub: true,
                            onUpdate: (self) => {
                                // Scrub video
                                videoEl.currentTime = self.progress * duration;

                                // Sync steps
                                const p = self.progress;
                                let activeIndex = 0;
                                if (p < STEP_1_END) activeIndex = 0;
                                else if (p < STEP_2_END) activeIndex = 1;
                                else activeIndex = 2;

                                stepRefs.current.forEach((step, i) => {
                                    if (step) {
                                        if (i === activeIndex) {
                                            gsap.to(step, { opacity: 1, scale: 1, duration: 0.3, overwrite: true });
                                        } else {
                                            gsap.to(step, { opacity: 0.3, scale: 0.95, duration: 0.3, overwrite: true });
                                        }
                                    }
                                });
                            }
                        });
                    },
                    // Mobile
                    "(max-width: 767px)": function () {
                        ScrollTrigger.create({
                            trigger: sectionEl,
                            pin: true,
                            start: "top top",
                            end: "bottom+=150% top",
                            scrub: true,
                            onUpdate: (self) => {
                                // Scrub video
                                videoEl.currentTime = self.progress * duration;

                                // Sync steps (same logic)
                                const p = self.progress;
                                let activeIndex = 0;
                                if (p < STEP_1_END) activeIndex = 0;
                                else if (p < STEP_2_END) activeIndex = 1;
                                else activeIndex = 2;

                                stepRefs.current.forEach((step, i) => {
                                    if (step) {
                                        if (i === activeIndex) {
                                            gsap.to(step, { opacity: 1, scale: 1, duration: 0.3, overwrite: true });
                                        } else {
                                            gsap.to(step, { opacity: 0.3, scale: 0.95, duration: 0.3, overwrite: true });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            };

            if (videoEl.readyState >= 1) {
                onLoaded();
            } else {
                videoEl.addEventListener("loadedmetadata", onLoaded);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-gradient-to-b from-[#1B0625] via-[#26130F] to-[#1B0625] text-white min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
        >
            <div className="relative z-10 flex w-full max-w-6xl flex-col gap-8 px-6 md:px-20 md:flex-row md:items-center md:gap-12">
                {/* Video block */}
                <div className="md:w-1/2 w-full flex justify-center items-center">
                    <div className="relative w-full max-w-xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/10 bg-black">
                        <video
                            ref={videoRef}
                            src="/pizzaProcess.mp4"
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="auto"
                        />

                    </div>
                </div>

                {/* Text steps */}
                <div className="md:w-1/2 w-full flex flex-col gap-6">
                    <h2 className="text-sm font-semibold tracking-[0.25em] text-mango uppercase">
                        Our Process
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-display leading-tight text-cream">
                        From raw idea to
                        <span className="text-pink"> piping-hot launch</span>.
                    </h3>

                    <div className="mt-8 flex flex-col gap-4">
                        {/* Step 1 */}
                        <div
                            ref={(el) => { stepRefs.current[0] = el; }}
                            className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 transition-colors duration-300"
                        >
                            <p className="text-xs font-semibold text-mint uppercase tracking-wide mb-2">
                                Step 1 · Order in
                            </p>
                            <p className="text-xl font-body text-cream/90">
                                You tell us your story, share your menu and vibe.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div
                            ref={(el) => { stepRefs.current[1] = el; }}
                            className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 transition-colors duration-300"
                        >
                            <p className="text-xs font-semibold text-mango uppercase tracking-wide mb-2">
                                Step 2 · We marinate
                            </p>
                            <p className="text-xl font-body text-cream/90">
                                We design, prototype, test with your staff and regulars.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div
                            ref={(el) => { stepRefs.current[2] = el; }}
                            className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 transition-colors duration-300"
                        >
                            <p className="text-xs font-semibold text-pink uppercase tracking-wide mb-2">
                                Step 3 · We serve
                            </p>
                            <p className="text-xl font-body text-cream/90">
                                We launch fast, connect your tools, stay on call.
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-white/40 font-body">
                        Warning: staring at this section for too long may cause sudden pizza cravings.
                    </p>
                </div>
            </div>
        </section>
    );
}
