export const createTrackedQRcodeURL = (url: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/qr-code?url=${url}`;
};
