"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Laptop() {
    const logoTexture = useTexture("/logo.png");
    // Ensure logo isn't flipped if needed, but plane maps normally. 
    // logoTexture.flipY = false;

    return (
        <group rotation={[0.1, -0.2, 0]}>
            {/* Base */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[3, 0.2, 2]} />
                <meshStandardMaterial color="#26130F" roughness={0.3} />
            </mesh>
            {/* Screen Frame */}
            <mesh position={[0, 0.6, -1]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial color="#E3E3E3" roughness={0.2} />{/*old colour: */}
            </mesh>
            {/* Screen Content - Logo */}
            <mesh position={[0, 0.6, -0.94]} rotation={[-0.3, 0, 0]}>
                {/* Adjust plane size to match logo aspect ratio if needed, or keeping generic 16:9 like */}
                <planeGeometry args={[2.8, 1.8]} />
                <meshBasicMaterial map={logoTexture} transparent />
            </mesh>
        </group>
    );
}

function RealisticBurger() {
    return (
        <group position={[2.5, 1, 0]} scale={1.5}>
            {/* Bottom Bun */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.35, 0.15, 32]} />
                <meshStandardMaterial color="#E3A857" roughness={0.8} />
            </mesh>
            {/* Lettuce */}
            <mesh position={[0, 0.1, 0]} rotation={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.05, 7, 1]} />
                <meshStandardMaterial color="#9BFF72" roughness={0.6} />
            </mesh>
            {/* Patty */}
            <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
                <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>
            {/* Cheese */}
            <mesh position={[0, 0.25, 0]} rotation={[0, 0.2, 0]}>
                <boxGeometry args={[0.6, 0.02, 0.6]} />
                <meshStandardMaterial color="#FFC107" roughness={0.5} />
            </mesh>
            {/* Tomato */}
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
                <meshStandardMaterial color="#FF3F83" roughness={0.2} />
            </mesh>
            {/* Top Bun */}
            <mesh position={[0, 0.45, 0]}>
                <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#E3A857" roughness={0.8} />
            </mesh>
            {/* Sesame Seeds */}
            {[...Array(10)].map((_, i) => (
                <mesh key={i} position={[Math.sin(i) * 0.2, 0.75, Math.cos(i) * 0.2]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <sphereGeometry args={[0.015]} />
                    <meshStandardMaterial color="#FFF5E6" />
                </mesh>
            ))}
        </group>
    )
}

function FloatingFood() {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={group}>
            <RealisticBurger />

            {/* Donut */}
            <mesh position={[-2.5, 0.5, 1]} rotation={[1, 0, 0]}>
                <torusGeometry args={[0.3, 0.15, 16, 32]} />
                <meshStandardMaterial color="#FF3F83" />
            </mesh>
            {/* Cup */}
            <group position={[0, 2, -1]}>
                <mesh>
                    <cylinderGeometry args={[0.3, 0.2, 0.6]} />
                    <meshStandardMaterial color="#4DF2C2" />
                </mesh>
            </group>
        </group>
    );
}

function CameraRig() {
    useFrame((state) => {
        state.camera.position.lerp(
            new THREE.Vector3(state.pointer.x * 1, state.pointer.y * 1 + 1, 6),
            0.05
        );
        state.camera.lookAt(0, 0, 0);
    });
    return <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={45} />;
}

export default function HeroScene() {
    return (
        <div className="h-[50vh] md:h-full w-full absolute top-0 right-0 md:relative pointer-events-none md:pointer-events-auto" data-cursor="link" data-cursor-text="Scroll!">
            <Canvas>
                <CameraRig />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={0.5} intensity={1} color="#4DF2C2" castShadow />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Laptop />
                </Float>
                <FloatingFood />

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <Environment preset="city" />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                    <Noise opacity={0.05} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
