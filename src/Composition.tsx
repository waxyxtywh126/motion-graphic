import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from 'remotion';

const AnimatedLetters = ({
  text,
  startFrame,
  fontSize,
  color,
  letterSpacing,
  fontWeight,
}: {
  text: string;
  startFrame: number;
  fontSize: number;
  color: string;
  letterSpacing: number;
  fontWeight: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.06em',
        lineHeight: 1,
      }}
    >
      {text.split('').map((char, index) => {
        const localFrame = frame - startFrame - index * 4;
        const opacity = interpolate(localFrame, [0, 8, 20], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const y = interpolate(localFrame, [0, 10, 22], [40, 0, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const rotate = interpolate(localFrame, [0, 18], [10, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <span
            key={`${char}-${index}`}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${y}px) rotate(${rotate}deg)`,
              color,
              fontSize,
              letterSpacing,
              fontWeight,
              textTransform: 'uppercase',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

const ParticleField = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: 18 }).map((_, index) => {
        const x = 200 + (index * 97) % 1600;
        const y = 120 + ((index * 137) % 760);
        const driftX = Math.sin((frame + index * 12) / 18) * 80;
        const driftY = Math.cos((frame + index * 17) / 24) * 60;
        const size = 10 + (index % 5) * 8;

        return (
          <div
            key={`particle-${index}`}
            style={{
              position: 'absolute',
              left: x + driftX,
              top: y + driftY,
              width: size,
              height: size,
              borderRadius: '999px',
              background: index % 2 === 0 ? 'rgba(125, 211, 252, 0.9)' : 'rgba(96, 165, 250, 0.7)',
              boxShadow: '0 0 30px rgba(96,165,250,0.8)',
            }}
          />
        );
      })}
    </>
  );
};

export const MyComposition = () => {
  const frame = useCurrentFrame();

  const glow = interpolate(frame, [0, 120], [0.35, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const progress = interpolate(frame, [0, 180], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barWidth = interpolate(frame, [0, 120, 180], [0, 100, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 20%, #111827 50%, #172554 100%)',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.25), transparent 28%), radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3), transparent 35%), radial-gradient(circle at 80% 75%, rgba(168,85,247,0.18), transparent 30%)',
          opacity: glow,
        }}
      />

      <ParticleField />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.2) 0%, rgba(2,6,23,0.65) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          border: '1px solid rgba(125, 211, 252, 0.25)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 80px rgba(59,130,246,0.25)',
        }}
      />

      <Sequence from={0} durationInFrames={180}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                border: '1px solid rgba(147,197,253,0.5)',
                borderRadius: '999px',
                padding: '8px 20px',
                fontSize: 20,
                letterSpacing: 7,
                color: '#dbeafe',
                textTransform: 'uppercase',
                opacity: interpolate(frame, [0, 25], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              Creative Studio
            </div>

            <AnimatedLetters
              text="Motion"
              startFrame={14}
              fontSize={170}
              color="#f8fafc"
              letterSpacing={-4}
              fontWeight={900}
            />

            <div
              style={{
                transform: `scale(${interpolate(frame, [20, 60], [0.9, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })})`,
                opacity: interpolate(frame, [28, 70], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <AnimatedLetters
                text="Graphic"
                startFrame={42}
                fontSize={90}
                color="#7dd3fc"
                letterSpacing={18}
                fontWeight={800}
              />
            </div>

            <div
              style={{
                width: 600,
                height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.9), transparent)',
                opacity: interpolate(frame, [50, 90], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />

            <div
              style={{
                fontSize: 28,
                letterSpacing: 12,
                textTransform: 'uppercase',
                color: '#bfdbfe',
                opacity: interpolate(frame, [60, 95], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              Abstract · Dynamic · Visuals
            </div>
          </div>
        </div>
      </Sequence>

      <Sequence from={110} durationInFrames={70}>
        <div
          style={{
            position: 'absolute',
            right: 140,
            bottom: 120,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            color: '#e2e8f0',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '5px solid rgba(148,163,184,0.25)',
              borderTopColor: '#7dd3fc',
              borderRightColor: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${frame * 1.8}deg)`,
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(125,211,252,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                color: '#e0f2fe',
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.7 }}>
              Loading
            </div>
            <div style={{ marginTop: 10, width: 200, height: 8, borderRadius: 999, background: 'rgba(148,163,184,0.2)', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${barWidth}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #7dd3fc, #60a5fa, #c084fc)',
                  boxShadow: '0 0 18px rgba(96,165,250,0.8)',
                }}
              />
            </div>
          </div>
        </div>
      </Sequence>

      <Sequence from={130} durationInFrames={50}>
        <div
          style={{
            position: 'absolute',
            left: 100,
            bottom: 110,
            fontSize: 18,
            letterSpacing: 10,
            textTransform: 'uppercase',
            color: 'rgba(191,219,254,0.8)',
            opacity: interpolate(frame - 130, [0, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          2026 / Motion Design
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
