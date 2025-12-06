"use client";
import { motion } from "framer-motion";
import { Download, Upload, Eye } from "lucide-react";

export default function CookNowPage() {
    return (
        <main className="min-h-screen bg-cream pt-32 pb-20 px-6 md:px-20" data-theme="light">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-5xl md:text-7xl text-eggplant mb-6"
                >
                    Let's get <span className="text-mango">cooking.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-body text-xl text-brown"
                >
                    Tell us what you need, and we'll whip up something special. Fill out the form below to get started.
                </motion.p>
            </div>

            {/* Google Form Embed */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-eggplant mb-20"
            >
                {/* Replace src with the provided link later, using a placeholder for now as requested */}
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfg7fQTwBD9uq9Wh_buqq5okpZTptgNGC_RbTDIb9Zi_uBaMA/viewform?embedded=true"
                    width="640"
                    height="800"
                    className="w-full h-[800px] md:h-[1000px]"
                    allow="camera; microphone; fullscreen; clipboard-write; encrypted-media; picture-in-picture; web-share"
                >
                    Loading…
                </iframe>
            </motion.div>

            {/* PDF Section */}
            <section className="max-w-5xl mx-auto bg-white rounded-3xl p-10 md:p-16 shadow-lg border border-eggplant/10 text-center">
                <h2 className="font-display text-4xl text-eggplant mb-8">Sign the Welcome Platter 🍽️</h2>
                <h3 className="font-body text-xl text-brown mb-8">Serve your starters with agreement</h3>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <button className="flex items-center justify-center gap-3 bg-eggplant text-cream font-bold py-4 px-8 rounded-full hover:bg-eggplant/90 transition-all hover:scale-105 shadow-md group">
                        <Eye size={24} />
                        View PDF
                        <Download size={20} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button className="flex items-center justify-center gap-3 bg-mango text-eggplant font-bold py-4 px-8 rounded-full hover:bg-mango/90 transition-all hover:scale-105 shadow-md relative overflow-hidden">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        <Upload size={24} />
                        Upload PDF
                    </button>
                </div>
                <p className="mt-6 text-sm text-brown/60 font-body">
                    We accept PDF, JPG, PNG. Max file size 10MB.
                </p>
            </section>
        </main>
    );
}
