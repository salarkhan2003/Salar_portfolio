import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ClayModel from './ClayModel';

// Particle system representing floating liquid clay elements in the background
function FloatingBubbles({ count = 25 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Track scroll position
  const scrollY = useRef(0);
  React.useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize random particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6 - 3; // Kept in the background
      const scale = Math.random() * 0.25 + 0.1;
      const speedX = (Math.random() - 0.5) * 0.005;
      const speedY = (Math.random() - 0.5) * 0.005;
      const speedR = Math.random() * 0.01;
      
      // Color choices: iOS blue, pink, purple, dark gray
      const colorOptions = ['#007AFF', '#FF2D55', '#AF52DE', '#34C759', '#1A1A22'];
      const color = new THREE.Color(colorOptions[Math.floor(Math.random() * colorOptions.length)]);

      data.push({ x, y, z, scale, speedX, speedY, speedR, color, rotation: Math.random() * Math.PI });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const scrollFactor = scrollY.current * 0.003; // Dynamic scroll responsiveness

    particles.forEach((p, i) => {
      // Calculate drifting positions with scroll offset
      const currentY = p.y + Math.sin(time * 0.5 + i) * 0.2 - scrollFactor * (p.scale * 1.5);
      const currentX = p.x + Math.cos(time * 0.3 + i) * 0.2;
      
      dummy.position.set(currentX, currentY, p.z);
      dummy.rotation.set(time * p.speedR, time * p.speedR * 0.5, p.rotation);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        roughness={0.3} 
        metalness={0.1} 
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </instancedMesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient environment lighting */}
        <ambientLight intensity={0.5} />
        
        {/* Soft fill light */}
        <directionalLight position={[-5, 5, 2]} intensity={0.6} />
        
        {/* Strong color-casting lights for aesthetic glassmorphism refraction */}
        <pointLight position={[8, 5, 3]} intensity={2.5} color="#007AFF" />
        <pointLight position={[-8, -5, 3]} intensity={2.5} color="#FF2D55" />
        <pointLight position={[0, -2, 4]} intensity={2} color="#AF52DE" />

        {/* Floating background clay elements */}
        <FloatingBubbles count={35} />

        {/* Central interactive ClayModel with floating movement wrapper */}
        <Float 
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.3}
          floatingRange={[-0.2, 0.2]}
        >
          <ClayModel />
        </Float>
        
        {/* Subtle environment reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
