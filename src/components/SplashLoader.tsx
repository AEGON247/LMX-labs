"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashLoader() {
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // Function to hide loader
        const handleLoad = () => {
            setLoading(false);
            setShowWarning(false);
        };

        // Check if page is already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        // "Slow Network" warning timer (5 seconds)
        const warningTimer = setTimeout(() => {
            if (loading) {
                setShowWarning(true);
                // Warning stays for 5 seconds then hides smoothly (optional per user request, "lifespan of 5 seconds")
                setTimeout(() => setShowWarning(false), 5000);
            }
        }, 5000);

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(warningTimer);
        };
    }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <Image
                            src="/loader.gif"
                            alt="Loading..."
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>

                    {/* Slow Connection Toast */}
                    <AnimatePresence>
                        {showWarning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-10 px-6 py-3 rounded-xl bg-mint/20 backdrop-blur-md border border-mint/30 shadow-lg flex items-center gap-3 text-eggplant font-body"
                            >
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                <span>Warning: Your internet connection is unstable</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
