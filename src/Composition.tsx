import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 90], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #0ea5e9 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: 'center',
          padding: 32,
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: 4 }}>MOTION</div>
        <div style={{ fontSize: 48, marginTop: 16, letterSpacing: 8 }}>GRAPHIC</div>
      </div>
    </AbsoluteFill>
  );
};
