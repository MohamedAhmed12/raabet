// utils/generateActivationCode.ts
export const generateActivationCode = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase(); // 4-character code
};