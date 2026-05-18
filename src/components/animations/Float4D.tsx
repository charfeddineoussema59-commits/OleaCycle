import { motion } from 'framer-motion';
import React from 'react';

interface Float4DProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  delay?: number;
}

export const Float4D = ({ 
  children, 
  className = "", 
  duration = 6, 
  yOffset = -15,
  delay = 0 
}: Float4DProps) => {
  return (
    <motion.div
      animate={{ y: [0, yOffset, 0] }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
