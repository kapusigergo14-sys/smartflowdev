'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

/**
 * Animated shader gradient for the Hero background.
 * Exact config exported from shadergradient.co (tuned for smartflowdev:
 * ink+hot-red+warm-white palette, plane tilted subtly to the right).
 *
 * Only ever mounted via HeroBackground.tsx's dynamic import so the
 * three.js + @react-three/fiber bundle (~400KB gz) stays off the
 * critical path and is never sent to mobile or reduced-motion clients.
 */
export default function ShaderScene() {
  return (
    <ShaderGradientCanvas
      pixelDensity={1}
      fov={40}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ShaderGradient
        animate="on"
        type="plane"
        shader="defaults"
        color1="#FF3D2E"
        color2="#FFD4C2"
        color3="#FAFAF7"
        brightness={0.9}
        grain="off"
        envPreset="city"
        lightType="3d"
        reflection={0}
        uSpeed={0.2}
        uStrength={2}
        uDensity={1.4}
        uFrequency={5.5}
        uAmplitude={1}
        uTime={0}
        positionX={1.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={30}
        cAzimuthAngle={177}
        cPolarAngle={90}
        cDistance={2.71}
        cameraZoom={1}
        range="disabled"
        rangeStart={0}
        rangeEnd={40}
      />
    </ShaderGradientCanvas>
  );
}
