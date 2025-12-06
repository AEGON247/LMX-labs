"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

// Types
interface CardData {
    id: string;
    title: string;
    items: string[];
    hoverColor: "mango" | "pink" | "cyan";
    icon: string;
    delay: number;
    details: {
        heading: string;
        features: string[];
    };
}

const MENU_ITEMS: CardData[] = [
    {
        id: "starter",
        title: "Starter: Spicy Landing Pages",
        items: ["₹25,000 One-time website", "₹5,000 Monthly from 2nd month", "FREE 5 posts + 1 reel"],
        hoverColor: "mango",
        icon: "🌶️",
        delay: 0.1,
        details: {
            heading: "What's inside the Starter Pack?",
            features: [
                "Custom High-Convert Landing Page",
                "Mobile-First Responsive Design",
                "Basic SEO Setup & Indexing",
                "Online Ordering + Payment Gateway",
                "Marketing Support",
                "Social Media Integration"
            ]
        }
    },
    {
        id: "main",
        title: "Main: Full-course Platforms",
        items: ["₹35,000-40,000 One-time website", "₹5,000 Monthly from 2nd month", "FREE 8 posts + 2 reels"],
        hoverColor: "pink",
        icon: "🍔",
        delay: 0.2,
        details: {
            heading: "Full-Course Platform Features",
            features: [
                "Multi-Page Custom Website (up to 5 pages)",
                "Advanced Animations & Interactions",
                "Smart Whatsapp Bot-answers customer queries",
                "Priority Support from our side",
                "Upto 3 prototypes before final deployment",
                "Engagement features like Spin-The-Wheel game"
            ]
        }
    },
    {
        id: "dessert",
        title: "Dessert: Loyalty & Add-ons",
        items: ["₹55,000-60,000 One-time website", "₹5,000 Monthly from 2nd month", "FREE 8 posts + 2-3 reels"],
        hoverColor: "cyan",
        icon: "🍦",
        delay: 0.3,
        details: {
            heading: "Premium Loyalty & Add-on Suite",
            features: [
                "Premium Website + Online Payments",
                "SEO Optimisation and Improved Visibility",
                "User Authentication & Profiles",
                "High level animations",
                "Upto 3 prototypes before final deployment",
                "Advanced Whatsapp Bot",
                "Automated Recurring Offers via WhatsApp & Email",
                "Comprehensive Monthly Maintenance"
            ]
        }
    }
];

// Typewriter Effect Component
const TypewriterText = ({ text }: { text: string }) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            } as const,
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            } as const,
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className={`font-display text-[46px] md:text-[50px] text-cream leading-tight ${letter === " " ? "md:w-full md:h-0" : ""}`}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

function MenuCard({ data, onClick }: { data: CardData; onClick: (data: CardData) => void }) {
    const textColors = {
        mango: "group-hover:text-mango",
        pink: "group-hover:text-pink",
        cyan: "group-hover:text-cyan",
    };
    const bgColors = {
        mango: "group-hover:bg-mango",
        pink: "group-hover:bg-pink",
        cyan: "group-hover:bg-cyan",
    };

    return (
        <motion.div
            className={`relative w-full md:w-1/3 h-[550px] bg-white rounded-xl p-8 shadow-xl border-4 border-eggplant flex flex-col justify-between group cursor-pointer`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: data.delay, duration: 0.5 }}
            whileHover={{ y: -10 }}
            data-cursor="link"
            data-cursor-text="View Details"
            onClick={() => onClick(data)}
        >
            <div className="z-10 relative h-full flex flex-col">
                <h3 className={`font-display text-4xl text-eggplant mb-6 leading-tight transition-colors duration-300 ${textColors[data.hoverColor]}`}>
                    {data.title}
                </h3>

                <ul className="space-y-4 flex-grow">
                    {data.items.map((item, i) => (
                        <li key={i} className="font-body text-eggplant flex items-start gap-3 text-lg group-hover:text-eggplant/80 transition-colors">
                            <span className={`w-2 h-2 mt-2 rounded-full bg-eggplant ${bgColors[data.hoverColor]} transition-colors duration-300 flex-shrink-0`} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Icon absolute bottom right */}
            <div className="absolute -bottom-4 -right-4 text-9xl filter drop-shadow-lg transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                {data.icon}
            </div>
        </motion.div>
    );
}

const MenuModal = ({ data, onClose }: { data: CardData; onClose: () => void }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl border-4 border-eggplant overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
                    >
                        <X className="w-6 h-6 text-eggplant" />
                    </button>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl filter drop-shadow-md">{data.icon}</span>
                            <h3 className="font-display text-3xl text-eggplant leading-none">
                                {data.details.heading}
                            </h3>
                        </div>

                        <div className="h-px w-full bg-eggplant/10 mb-6" />

                        <ul className="space-y-3">
                            {data.details.features.map((feature, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                    className="font-body text-lg text-eggplant/90 flex items-start gap-3"
                                >
                                    <span className="text-mango mt-1">★</span>
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-eggplant/5 rounded-full blur-3xl" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function MenuCards() {
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

    return (
        <section className="min-h-screen bg-eggplant py-20 px-6 md:px-20 relative overflow-hidden flex items-center">
            {/* Animated Checkerboard pattern */}
            <motion.div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#26130F 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }}
                animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start relative z-10" id="services">
                <div className="w-full md:w-1/4 mb-10 md:mb-0 md:sticky md:top-32">
                    <TypewriterText text="Our ingredients" />
                    <p className="font-body text-white text-lg mt-6">
                        Fresh code, spicy designs, and zero bloat.
                    </p>
                </div>

                <div className="w-full md:w-3/4 flex flex-col gap-8 md:flex-row">
                    {MENU_ITEMS.map((item) => (
                        <MenuCard
                            key={item.id}
                            data={item}
                            onClick={setSelectedCard}
                        />
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedCard && (
                <MenuModal
                    data={selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </section>
    );
}
