"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ProcessSteps() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        { title: "Order in", desc: "You tell us your story, share your menu and vibe.", icon: "🥡" },
        { title: "We marinate", desc: "We design, prototype, test with your staff and regulars.", icon: "🍲" },
        { title: "You serve", desc: "We launch fast, connect your tools, stay on call.", icon: "🍽️" },
    ];

    return (
        <section id="process" className="min-h-screen bg-cream py-20 px-6 md:px-20 relative overflow-hidden">
            <div className="max-w-5xl mx-auto" ref={containerRef}>
                <h2 className="font-display text-5xl text-eggplant mb-20 text-center">From "we really should have a website" to launch.</h2>

                <div className="relative">
                    {/* Continuous Background Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-eggplant/10 -translate-x-1/2 hidden md:block" />

                    {/* Progress Line */}
                    <motion.div
                        className="absolute left-1/2 top-0 w-1 bg-mango -translate-x-1/2 hidden md:block origin-top"
                        style={{ height: "100%", scaleY: scaleY }}
                    />

                    {/* Glowing Ball */}
                    <motion.div
                        className="absolute left-1/2 w-8 h-8 -translate-x-1/2 hidden md:flex items-center justify-center z-20 pointer-events-none"
                        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    >
                        <div className="w-4 h-4 bg-mango rounded-full shadow-[0_0_20px_rgba(255,185,0,0.8)] border-2 border-white animate-pulse" />
                    </motion.div>

                    {steps.map((step, i) => (
                        <StepCard key={i} step={step} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index }: { step: { title: string, desc: string, icon: string }, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`flex flex-col md:flex-row items-center gap-10 mb-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="w-full md:w-1/2 flex justify-center">
                <motion.div
                    initial={{ scale: 0.8, filter: "grayscale(100%)" }}
                    whileInView={{ scale: 1, filter: "grayscale(0%)" }}
                    viewport={{ margin: "-50% 0px -50% 0px" }} // Trigger when center
                    transition={{ duration: 0.5 }}
                    className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-eggplant z-10 relative transition-transform"
                >
                    {step.icon}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ margin: "-50% 0px -50% 0px" }}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-mango rounded-full flex items-center justify-center font-bold text-eggplant border-2 border-eggplant"
                    >
                        {index + 1}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0.5, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-50% 0px -50% 0px" }} // Highlight text when center
                className={`w-full md:w-1/2 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
            >
                <h3 className="font-display text-4xl text-eggplant mb-4">{step.title}</h3>
                <p className="font-body text-xl text-brown">{step.desc}</p>
            </motion.div>
        </motion.div>
    );
}
