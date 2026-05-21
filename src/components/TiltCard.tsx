import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = '', maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for x/y rotations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth damping/bounce (feels heavy/tactile)
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Map mouse position to glare overlay positions
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.03, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative tilt-card ${className}`}
    >
      {/* Glare overlay (iOS 18 reflection style) */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{
          background: useTransform(
            [glareX, glareY, glareOpacity],
            (latest: number[]) => {
              const [gx, gy, go] = latest;
              return `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${go}) 0%, transparent 80%)`;
            }
          ) as any,
        }}
      />
      
      {/* Content wrapper with inner 3D depth */}
      <div 
        style={{ transform: 'translateZ(25px)' }} 
        className="w-full h-full tilt-card-inner"
      >
        {children}
      </div>
    </motion.div>
  );
}
