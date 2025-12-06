"use client";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer id="contact" className="bg-eggplant text-cream py-20 px-6 md:px-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="relative h-[400px] flex items-center justify-center select-none">
                    <motion.h2
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 0.3 }}
                        transition={{ duration: 1 }}
                        className="font-display text-[44px] md:text-9xl absolute top-10 md:top-0 left-0 right-0 text-transparent"
                        style={{ WebkitTextStroke: "2px #FFB33F" }}
                    >
                        Can't pay us?
                    </motion.h2>
                    <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-[65px] md:text-[12rem] text-pink relative z-10 leading-none"
                        data-cursor="link"
                        data-cursor-text="Kidding!"
                    >
                        No problem.
                    </motion.h2>
                    <motion.h2
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="font-display text-[37px] md:text-8xl absolute bottom-20 md:bottom-10 left-0 right-0 text-mint opacity-80 rotate-2"
                    >
                        We accept pizza.*
                    </motion.h2>
                    <p className="absolute bottom-0 right-0 text-xs text-cream/40">*Also card, obviously.</p>
                </div>

                <div className="mt-20 border-t border-cream/20 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        {/* Left block */}
                        <div className="font-body text-lg text-left">
                            <h3 className="font-display text-3xl mb-2">LMX Labs</h3>
                            <p className="text-cream/60 mb-4">Ridiculously tasty web experiences.</p>
                        </div>

                        {/* Right block */}
                        <div className="flex flex-col items-end text-right font-body text-lg">
                            <div className="flex gap-8 mb-2">
                                <a href="https://www.instagram.com/lmx.labs?igsh=em9pdm8zYW5kOW4w" className="hover:text-mango transition-colors" data-cursor="link">Instagram</a>
                                <a href="https://www.linkedin.com/company/lmx-labs" className="hover:text-mango transition-colors" data-cursor="link">Linkedin</a>
                                <a href="mailto:lmxlabstoyou@gmail.com" className="hover:text-mango transition-colors" data-cursor="link">Email</a>
                            </div>
                            <div className="text-sm text-cream/60">Contact CEO directly @: +91 94560 11059 (Whatsapp)</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
