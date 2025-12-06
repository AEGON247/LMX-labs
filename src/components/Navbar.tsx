"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkBg, setIsDarkBg] = useState(true); // Default to true (Hero is dark)

    useEffect(() => {
        const checkBackground = () => {
            // Check center of navbar position
            const element = document.elementFromPoint(window.innerWidth / 2, 40);
            if (!element) return;

            // Find closest parent with data-theme
            const section = element.closest("[data-theme]");
            if (section) {
                const theme = section.getAttribute("data-theme");
                setIsDarkBg(theme === "dark");
            }
        };

        window.addEventListener("scroll", checkBackground);
        // Initial check
        checkBackground();

        // Also check on resize
        window.addEventListener("resize", checkBackground);

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("scroll", checkBackground);
            window.removeEventListener("resize", checkBackground);
        };
    }, [isOpen]);

    const links = [
        { name: "Our Work", href: "/#work" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/#services" },
        { name: "Process", href: "/#process" },
        { name: "Contact", href: "/#contact" },
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            } as any,
        },
        open: {
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            } as any,
        },
    };

    const linkVariants = {
        closed: { x: 50, opacity: 0 },
        open: { x: 0, opacity: 1 },
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-20 py-6 pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className={`font-display text-2xl md:text-3xl font-bold tracking-tighter transition-colors duration-300 text-mango`}>
                        LMX Labs
                    </h1>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 pointer-events-auto bg-eggplant/50 backdrop-blur-md px-8 py-3 rounded-full border border-cream/10 items-center">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-body text-cream hover:text-mango transition-colors text-sm font-medium relative group block px-2"
                            data-cursor="link"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mango transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <a
                        href="/cooknow"
                        className="bg-mango text-eggplant font-bold py-3 px-6 rounded-full hover:bg-cream transition-colors block"
                        data-cursor="link"
                    >
                        Let's Cook
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden pointer-events-auto text-cream mix-blend-difference p-2"
                    data-cursor="link"
                >
                    <Menu size={32} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-50 bg-eggplant flex flex-col justify-center items-center md:hidden"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-cream p-2 hover:text-pink transition-colors"
                            data-cursor="link"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {links.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    variants={linkVariants}
                                    onClick={() => setIsOpen(false)}
                                    className="font-display text-5xl text-cream hover:text-mango transition-colors"
                                    data-cursor="link"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            variants={linkVariants}
                            className="absolute bottom-10 text-cream/50 font-body text-sm"
                        >
                            Ridiculously tasty web experiences.
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
