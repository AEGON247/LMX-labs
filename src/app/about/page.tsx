"use client";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const TEAM = [
    { name: "Lakshya Mehrotra", role: "CEO & Head Chef", img: "https://placehold.co/400x400/26130F/FFF?text=CEO" },
    { name: "Sachin Mehta", role: "CTO & Master Brewer", img: "https://placehold.co/400x400/E55812/FFF?text=CTO" },
    { name: "Ammar Abdullah", role: "CMO & Flavor Specialist", img: "https://placehold.co/400x400/F4D35E/26130F?text=CMO" },
    { name: "Devashish Mahale", role: "CDO & Plating Artist", img: "https://placehold.co/400x400/E899DC/26130F?text=CDO" },
    { name: "Sam", role: "HR & Quality Control", img: "https://placehold.co/400x400/0E79B2/FFF?text=HR" },
];

const STATS = [
    { label: "Saved for our Clients", value: 25, prefix: "Over", suffix: "L+", numberPrefix: "₹" },
    { label: "Faster Launch Time", value: 3, prefix: "Av.", suffix: "x" },
    { label: "Customer Happiness", value: 100, prefix: "Pure", suffix: "%" },
];

function CountingNumber({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { bounce: 0, duration: 2000 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{displayValue}{suffix}
        </span>
    );
}

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <main className="min-h-screen bg-cream overflow-hidden relative" ref={containerRef} data-theme="light">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-6xl md:text-9xl text-eggplant mb-10 leading-none"
                >
                    Not just another<br /> <span className="text-mango">web agency.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-body text-xl md:text-2xl text-brown max-w-2xl"
                >
                    We founded LMX Labs because we were tired of seeing amazing food served on terrible websites. We believe your digital menu should be as appetizing as your real one.
                </motion.p>

                {/* Decorative Elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-40 right-10 md:right-40 text-8xl opacity-20 pointer-events-none"
                >
                    🍩
                </motion.div>
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-10 md:left-40 text-8xl opacity-20 pointer-events-none"
                >
                    🥑
                </motion.div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6 md:px-20 bg-white">
                <h2 className="font-display text-5xl text-eggplant mb-16 text-center">Meet the Kitchen Staff</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                    {TEAM.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-cream rounded-2xl overflow-hidden shadow-lg group cursor-pointer border-2 border-transparent hover:border-mango transition-colors"
                        >
                            <div className="relative h-64 w-full bg-gray-200">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-display text-xl text-eggplant mb-1">{member.name}</h3>
                                <p className="font-body text-sm text-mango font-bold uppercase tracking-wider">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Comparison Section */}
            <section className="py-40 px-6 md:px-20 bg-eggplant text-cream relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#F4D35E 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight">
                            Why restaurants <span className="text-mango">love us</span> more than big agencies.
                        </h2>
                        <p className="font-body text-lg opacity-80 mb-8">
                            Big corporations charge you for their office snacks and ping pong tables. We charge you for code that works and designs that sell. No bloat, just flavor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-body text-sm text-mango mb-1">{stat.prefix}</p>
                                    <h3 className="font-display text-white text-2xl">{stat.label}</h3>
                                </div>
                                <div className="font-display text-5xl text-mango">
                                    <CountingNumber
                                        value={stat.value}
                                        prefix={stat.numberPrefix}
                                        suffix={stat.suffix}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
