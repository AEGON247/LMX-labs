"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Run GSAP animation on all devices (mobile + desktop)
            const storiesCount = 4; // We know there are 4 stories

            gsap.to(trackRef.current, {
                xPercent: -100 * (storiesCount - 1) / storiesCount, // Move by 75% of the 400vw width
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (storiesCount - 1),
                    end: () => "+=" + (sectionRef.current?.offsetWidth || window.innerWidth) * (storiesCount - 1),
                    invalidateOnRefresh: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stories = [
        {
            title: "The Struggle",
            text: "A plain, sad restaurant with a grey sign and 'Website Coming Soon' banner.",
            color: "bg-eggplant",
            emoji: "🏚️",
        },
        {
            title: "The Audit",
            text: "We audit your tech, stalk your Insta, and taste your vibes.",
            color: "bg-brown",
            emoji: "🕵️‍♂️",
        },
        {
            title: "The Glow Up",
            text: "The restaurant transforms into a vibrant, neon-lit shop.",
            color: "bg-pink",
            emoji: "✨",
        },
        {
            title: "The Result",
            text: "More bookings, more online orders, more late-night cravings.",
            color: "bg-mango",
            emoji: "📈",
        },
    ];

    return (
        <section ref={sectionRef} className="w-full h-screen overflow-hidden relative hide-scrollbar">
            <div
                ref={trackRef}
                className="w-[400vw] h-full flex flex-row flex-nowrap"
            >
                {stories.map((story, i) => (
                    <div key={i} className={`story-panel w-screen h-full flex-shrink-0 flex flex-col items-center justify-center ${story.color} relative border-r border-cream/10 snap-center`} data-cursor="link" data-cursor-text="Scroll">
                        <div className="text-8xl md:text-9xl mb-8 hover:scale-110 transition-transform duration-300">{story.emoji}</div>
                        <h2 className="font-display text-5xl md:text-8xl text-cream mb-6 text-center">{story.title}</h2>
                        <p className="font-body text-xl md:text-2xl text-cream/80 max-w-2xl text-center px-4">{story.text}</p>
                        <div className="absolute bottom-10 left-10 text-cream/20 text-7xl md:text-9xl font-display font-bold select-none">
                            0{i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
