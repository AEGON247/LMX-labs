"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: true,
            });

            // Parallax text effect on scroll
            gsap.to(textRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            })
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const titleVariants = {
        hidden: { y: "100%" },
        visible: (i: number) => ({
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] as const },
        }),
    };

    return (
        <section ref={containerRef} className="h-screen w-full flex flex-col md:flex-row items-center justify-between bg-eggplant relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#26130F_0%,#1B0625_100%)] -z-20" />

            {/* Text Content */}
            <div ref={textRef} className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-15 z-10 pt-32 md:pt-0 pointer-events-none md:pointer-events-auto relative">
                <h1 className="font-display font-bold text-cream leading-[0.9] mb-6" style={{ fontSize: "clamp(2.75rem, 7.5vw, 5.75rem)" }}>
                    <div className="overflow-hidden">
                        <motion.div custom={0} variants={titleVariants} initial="hidden" animate="visible">
                            We cook up
                        </motion.div>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div custom={1} variants={titleVariants} initial="hidden" animate="visible">
                            websites for
                        </motion.div>
                    </div>
                    <div className="overflow-hidden text-mango">
                        <motion.div custom={2} variants={titleVariants} initial="hidden" animate="visible">
                            food people.
                        </motion.div>
                    </div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-body text-xl text-cream/80 mb-10 max-w-md"
                >
                    Menus that move. Bookings that never sleep.
                </motion.p>

                <div className="flex gap-4 pointer-events-auto">
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink text-eggplant font-bold py-4 px-8 rounded-full text-lg shadow-[4px_4px_0px_0px_#4DF2C2] border-2 border-eggplant hover:shadow-none transition-shadow cursor-none"
                        data-cursor="link"
                        data-cursor-text="Yum!"
                    >
                        <a href="/about">See the magic</a>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent text-cream font-bold py-4 px-8 rounded-full text-lg border-2 border-cream hover:bg-cream hover:text-eggplant transition-colors cursor-none"
                        data-cursor="link"
                    >
                        <a href="/cooknow">Book a taste test</a>
                    </motion.button>
                </div>
            </div>

            {/* 3D Scene */}
            <div className="w-full md:w-1/2 h-full absolute md:relative top-0 right-0 z-0 opacity-50 md:opacity-100">
                <HeroScene />
            </div>
        </section>
    );
}
