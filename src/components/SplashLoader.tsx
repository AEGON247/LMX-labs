"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 2.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <Image
                            src="/loader.gif"
                            alt="Loading..."
                            fill
                            className="object-contain"
                            priority
                            unoptimized // Recommended for gifs if optimization causes issues
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
