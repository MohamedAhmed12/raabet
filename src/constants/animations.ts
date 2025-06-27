// Animation variants for different animation types
export const animationVariants = {
  none: {},
  shake: {
    x: [0, -5, 5, -5, 5, 0, 0, 0, 0, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 0.91, 0.95, 0.98, 1],
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 2,
    },
  },
  tada: {
    scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, -3, 3, -3, 3, -3, 3, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 2,
    },
  },
  pulse: {
    scale: [1, 1.037, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 0.65,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
      repeatDelay: 1,
    },
  },
  jump: {
    y: [0, -16, 0],  // Simple up and down
    transition: {
      duration: 0.5,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 0.5,
    },
  },
  swing: {
    rotate: [0, 10, -10, 5, -5, 0],
    transformOrigin: "top center",
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 2,
    },
  },
  jello: {
    transform: [
      "skew(0deg, 0deg)",
      "skew(0deg, 0deg)",
      "skew(12deg, 0deg)",
      "skew(-10deg, 0deg)",
      "skew(6deg, 0deg)",
      "skew(0deg, 0deg)",
    ],
    transition: {
      duration: 0.9,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 2,
    },
  },
  rubberBand: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 2,
    },
  },
} as const;

export type AnimationVariant = keyof typeof animationVariants;
