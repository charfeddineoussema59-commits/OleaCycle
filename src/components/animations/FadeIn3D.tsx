import { motion } from 'framer-motion';
import React from 'react';

interface FadeIn3DProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export const FadeIn3D = ({ children, delay = 0, className = "", yOffset = 40 }: FadeIn3DProps) => {
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        initial={{ opacity: 0, rotateX: 15, y: yOffset, scale: 0.98 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
