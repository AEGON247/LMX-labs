"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [cursorVariant, setCursorVariant] = useState("default");
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const moveCursor = (e: PointerEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            const target = (e.target as HTMLElement).closest("[data-cursor]");
            if (target) {
                setCursorVariant(target.getAttribute("data-cursor") || "default");
                setCursorText(target.getAttribute("data-cursor-text") || "");
            } else {
                setCursorVariant("default");
                setCursorText("");
            }
        };

        window.addEventListener("pointermove", moveCursor);
        return () => {
            window.removeEventListener("pointermove", moveCursor);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "var(--color-mango)",
            mixBlendMode: "difference" as any,
            borderRadius: "50%",
        },
        link: {
            height: 64,
            width: 64,
            backgroundColor: "var(--color-pink)",
            mixBlendMode: "difference" as any,
            borderRadius: "50%",
        },
        blob: {
            height: 100,
            width: 100,
            backgroundColor: "var(--color-mint)",
            mixBlendMode: "normal" as any,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Blob shape
        },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center text-eggplant font-bold text-sm text-center leading-tight"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            {cursorText && (
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    {cursorText}
                </motion.span>
            )}
        </motion.div>
    );
}
