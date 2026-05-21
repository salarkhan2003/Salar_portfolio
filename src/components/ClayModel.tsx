import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ClayModel() {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Dragging and interaction states
  const [isDragging, setIsDragging] = useState(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.3, y: 0.5 });
  const currentRotation = useRef({ x: 0.3, y: 0.5 });
  const velocity = useRef({ x: 0, y: 0 });
  
  // Mouse position for hover parallax
  const mouse = useRef({ x: 0, y: 0 });

  // Track global mouse position for parallax
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Normalize mouse coordinates from -1 to 1
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  // Pointer down: initiate drag
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    pointerStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { x: currentRotation.current.x, y: currentRotation.current.y };
    velocity.current = { x: 0, y: 0 };
  };

  // Pointer move: update rotations
  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (!isDragging) return;

    const deltaX = (e.clientX - pointerStart.current.x) * 0.005;
    const deltaY = (e.clientY - pointerStart.current.y) * 0.005;

    const newTargetX = rotationStart.current.x + deltaY;
    const newTargetY = rotationStart.current.y + deltaX;

    velocity.current.x = newTargetX - targetRotation.current.x;
    velocity.current.y = newTargetY - targetRotation.current.y;

    targetRotation.current.x = newTargetX;
    targetRotation.current.y = newTargetY;
  };

  // Pointer up: release drag
  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  // Render loop for physics and animations
  useFrame((state) => {
    if (!meshRef.current) return;

    if (isDragging) {
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.2;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.2;
    } else {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;

      const parallaxX = mouse.current.y * 0.4;
      const parallaxY = mouse.current.x * 0.4;

      targetRotation.current.x += velocity.current.x + 0.001;
      targetRotation.current.y += velocity.current.y + 0.002;

      currentRotation.current.x += (targetRotation.current.x + parallaxX - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y + parallaxY - currentRotation.current.y) * 0.05;
    }

    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;

    // Pulse core scale and intensity
    if (coreRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = 1.0 + Math.sin(time * 3) * 0.05;
      coreRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* 1. Glassmorphic Silicon Base Substrate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 3.2, 0.15]} />
        <meshPhysicalMaterial
          color="#0d0d12"
          roughness={0.1}
          metalness={0.1}
          transmission={0.7}
          thickness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer framing borders for the chip */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[3.25, 3.25, 0.02]} />
        <meshBasicMaterial color="#3a3a4c" wireframe />
      </mesh>

      {/* 2. Central Microprocessor Core (Metallic Purple/Gold) */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshPhysicalMaterial
          color="#8A2BE2" // Vibrant purple
          roughness={0.2}
          metalness={0.85}
          clearcoat={1.0}
        />
      </mesh>

      {/* 3. Glowing Core Light Indicator (CPU Activity indicator) */}
      <mesh ref={coreRef} position={[0, 0, 0.18]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial 
          color="#007AFF" // Electric iOS Blue
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* 4. Golden Pin Connectors on Edges */}
      {/* Left Pins */}
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((y, i) => (
        <mesh key={`pin-l-${i}`} position={[-1.68, y, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.12]} />
          <meshPhysicalMaterial
            color="#FFD700" // Gold
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Right Pins */}
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((y, i) => (
        <mesh key={`pin-r-${i}`} position={[1.68, y, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.12]} />
          <meshPhysicalMaterial
            color="#FFD700" // Gold
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Top & Bottom Pins */}
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((x, i) => (
        <React.Fragment key={`pins-tb-${i}`}>
          <mesh position={[x, 1.68, 0]}>
            <boxGeometry args={[0.15, 0.15, 0.12]} />
            <meshPhysicalMaterial
              color="#FFD700" // Gold
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[x, -1.68, 0]}>
            <boxGeometry args={[0.15, 0.15, 0.12]} />
            <meshPhysicalMaterial
              color="#FFD700" // Gold
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </React.Fragment>
      ))}

      {/* 5. Printed Circuit Board (PCB) Traces / Gold Grid Lines */}
      {/* Horizontal traces */}
      {[-0.6, 0.6].map((y, i) => (
        <mesh key={`trace-h-${i}`} position={[0, y, 0.09]}>
          <boxGeometry args={[2.8, 0.04, 0.02]} />
          <meshBasicMaterial color="#FF9500" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Vertical traces */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={`trace-v-${i}`} position={[x, 0, 0.09]}>
          <boxGeometry args={[0.04, 2.8, 0.02]} />
          <meshBasicMaterial color="#FF9500" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Lighting specific to the microchip model */}
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#007AFF" />
      <pointLight position={[-2, -2, 2]} intensity={1.5} color="#FF2D55" />
      <pointLight position={[0, 0, 2]} intensity={1.0} color="#00FF66" />
    </group>
  );
}
