"use client";
import { motion } from "framer-motion";

const projects = [
    { id: 1, title: "Burger Kingz", category: "Restaurants", url: "https://kunafa-house-vellore.web.app", color: "mango" },
    { id: 2, title: "Sushi Su", category: "Restaurants", url: "https://temptations.vercel.app", color: "pink" },
    { id: 3, title: "Bean There", category: "Cafes", url: "https://en.wikipedia.org/wiki/Coffee", color: "mint" },
    { id: 4, title: "Dough Co.", category: "Bakeries", url: "https://en.wikipedia.org/wiki/Doughnut", color: "cyan" },
];

export default function WorkCarousel() {
    return (
        <section id="work" className="min-h-screen bg-eggplant py-20 relative overflow-hidden flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-20 mb-10">
                <h2 className="font-display text-5xl md:text-7xl text-cream mb-6">
                    Fresh from the kitchen.
                </h2>
                <div className="flex gap-4 flex-wrap">
                    {["All", "Restaurants", "Food Brands", "Apps"].map((filter) => (
                        <button
                            key={filter}
                            className="px-6 py-2 rounded-full border border-cream/20 text-cream hover:bg-cream hover:text-eggplant transition-colors"
                            data-cursor="link"
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full overflow-x-auto pb-10 px-6 md:px-20 hide-scrollbar snap-x snap-mandatory">
                <div className="flex gap-8 w-max">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="relative w-[85vw] md:w-[800px] h-[60vh] md:h-[600px] flex-shrink-0 snap-center group"
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Laptop Mockup */}
                            <div className="absolute top-10 left-0 w-[90%] h-[55%] md:h-[80%] bg-brown rounded-xl p-2 shadow-2xl z-10 border border-white/10">
                                <div className="w-full h-full bg-white rounded overflow-hidden relative">
                                    <iframe
                                        src={project.url}
                                        className="w-full h-full border-0 pointer-events-none"
                                        title={project.title}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors pointer-events-auto cursor-pointer" data-cursor="link" data-cursor-text="Visit" onClick={() => window.open(project.url, '_blank')} />
                                </div>
                            </div>

                            {/* Phone Mockup - Hidden on Mobile, Visible on Desktop */}
                            <div className="hidden md:block absolute bottom-32 right-0 w-[25%] h-[60%] bg-brown rounded-3xl p-2 shadow-2xl z-20 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 border border-white/10">
                                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                                    <iframe
                                        src={project.url}
                                        className="w-full h-full border-0 pointer-events-none"
                                        title={project.title + " Mobile"}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors pointer-events-auto cursor-pointer" data-cursor="link" data-cursor-text="Visit" onClick={() => window.open(project.url, '_blank')} />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 md:p-0">
                                <h3 className="font-display text-4xl text-cream mb-2 drop-shadow-lg">{project.title}</h3>
                                <p className="font-body text-cream/80 text-lg drop-shadow-md">{project.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
