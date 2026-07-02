"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={fadeInUp.initial}
      whileInView={fadeInUp.whileInView}
      viewport={fadeInUp.viewport}
      transition={{ ...fadeInUp.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
