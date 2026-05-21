import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ClayModel from './ClayModel';

// Particle node network representing circuit connections and data nodes in the background
function TechNetwork({ count = 40 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Track scroll position
  const scrollY = useRef(0);
  React.useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize random node coordinates and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    // Colors match the branding (iOS Blue, Purple, Orange, Cyber Green)
    const colorOptions = ['#007AFF', '#AF52DE', '#FF9500', '#34C759'];
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3; // Positioned behind the model
      
      const color = new THREE.Color(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, [count]);

  // Speeds and offsets for each telemetry node
  const nodes = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (Math.random() - 0.5) * 0.005,
        sineOffset: Math.random() * Math.PI,
        sizeScale: Math.random() * 0.4 + 0.8
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const scrollFactor = scrollY.current * 0.002; // Reacts to scrolling depth

    const posAttr = pointsRef.current.geometry.attributes.position;
    
    // We will draw line segment connections between nodes that are close to each other
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      // Calculate dynamic drift + scroll multiplier
      const x = positions[i * 3] + Math.sin(time * 0.2 + nodes[i].sineOffset) * 0.3;
      const y = positions[i * 3 + 1] + Math.cos(time * 0.2 + nodes[i].sineOffset) * 0.3 - scrollFactor * nodes[i].sizeScale;
      const z = positions[i * 3 + 2];

      posAttr.setXYZ(i, x, y, z);

      // Connect lines to nearby points (forming circuit grids)
      for (let j = i + 1; j < count; j++) {
        const xj = posAttr.getX(j);
        const yj = posAttr.getY(j);
        const zj = posAttr.getZ(j);

        const dx = x - xj;
        const dy = y - yj;
        const dz = z - zj;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // If distance is close, create connection
        if (dist < 2.2 && lineIndex < maxConnections) {
          linePositions[lineIndex * 6] = x;
          linePositions[lineIndex * 6 + 1] = y;
          linePositions[lineIndex * 6 + 2] = z;
          
          linePositions[lineIndex * 6 + 3] = xj;
          linePositions[lineIndex * 6 + 4] = yj;
          linePositions[lineIndex * 6 + 5] = zj;
          lineIndex++;
        }
      }
    }

    posAttr.needsUpdate = true;

    // Dynamically update the line connections geometry
    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3)
    );
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Telemetry data nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Connection traces / circuit pathways */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#007AFF" // iOS blue connectivity color
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
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

        {/* Telemetry nodes constellation background */}
        <TechNetwork count={40} />

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
