export const animationVariants = {
  none: {},

  shake: {
    x: [0, -5, 5, -5, 5, 0, 0, 0, 0, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 0.91, 0.95, 0.98, 1],
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.5,
    },
  },

  tada: {
    scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, -3, 3, -3, 3, -3, 3, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },

  pulse: {
    scale: [1, 1.04, 1],
    opacity: [1, 0.92, 1],
    transition: {
      duration: 0.8, // Slower, more noticeable pulse
      ease: [0.4, 0, 0.2, 1], // Smoother easing
      repeat: Infinity,
      repeatType: "reverse" as const,
      repeatDelay: 0.8, // Shorter delay between pulses
    },
  },

  jump: {
    y: [0, -16, 0],
    transition: {
      // duration: 0.5,
      duration: 0.4,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.2,
    },
  },

  swing: {
    rotate: [0, 6, -6, 3, -3, 0], // Reduced rotation range by ~40%
    transformOrigin: "top center",
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.4,
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
      duration: 0.6,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.5,
    },
  },

  rubberBand: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      // duration: 1,
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      repeatDelay: 1.5,
    },
  },
} as const;

export type AnimationVariant = keyof typeof animationVariants;
