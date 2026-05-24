import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

// Lightweight replacement — no 3D transforms, no framer-motion springs
// Keeps the same API so all usages work unchanged
export default function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
