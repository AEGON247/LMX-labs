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
                        className="font-display text-4xl md:text-9xl absolute top-10 md:top-0 left-0 right-0 text-transparent"
                        style={{ WebkitTextStroke: "2px #FFB33F" }}
                    >
                        Can't pay us?
                    </motion.h2>
                    <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-6xl md:text-[12rem] text-pink relative z-10 leading-none"
                        data-cursor="link"
                        data-cursor-text="Kidding!"
                    >
                        No problem.
                    </motion.h2>
                    <motion.h2
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="font-display text-3xl md:text-8xl absolute bottom-20 md:bottom-10 left-0 right-0 text-mint opacity-80 rotate-2"
                    >
                        We accept pizza.*
                    </motion.h2>
                    <p className="absolute bottom-0 right-0 text-xs text-cream/40">*Also card, obviously.</p>
                </div>

                <div className="mt-20 flex flex-col md:flex-row justify-between items-center border-t border-cream/20 pt-10">
                    <div className="text-left mb-10 md:mb-0">
                        <h3 className="font-display text-3xl mb-2">LMX Labs</h3>
                        <p className="font-body text-cream/60">Ridiculously tasty web experiences.</p>
                    </div>
                    <div className="flex gap-8 font-body text-lg">
                        <a href="#" className="hover:text-mango transition-colors" data-cursor="link">Instagram</a>
                        <a href="#" className="hover:text-mango transition-colors" data-cursor="link">Twitter</a>
                        <a href="#" className="hover:text-mango transition-colors" data-cursor="link">Email</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
