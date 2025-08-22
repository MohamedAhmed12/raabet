import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a shared config helper
export const getSentryConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  const environment = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV;
  const isDevelopment = ["local", "development"].includes(environment);

  return {
    isDevelopment,
    isProduction,
    dsn,
    environment,
  };
};
