"use client";
import { useEffect } from "react";
import { getSentryConfig } from "@/lib/utils";

export default function LazySentryInit() {
  useEffect(() => {
    import("@sentry/nextjs").then((Sentry) => {
      const { isDevelopment, dsn, environment } = getSentryConfig();
      Sentry.init({
        dsn,
        environment,

        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: false, // Unmask text for debugging
            maskAllInputs: false, // Unmask inputs for debugging
            blockAllMedia: true,
          }),
          Sentry.captureConsoleIntegration({
            levels: isDevelopment ? ["error", "debug"] : ["error"],
          }),
        ],

        // More conservative sampling
        tracesSampleRate: isDevelopment ? 1.0 : 0.2,
        replaysSessionSampleRate: 0.01, // Lower session sampling
        replaysOnErrorSampleRate: 0.5, // Moderate error replay sampling

        debug:
          isDevelopment &&
          process.env.NEXT_PUBLIC_ENABLE_SENTRY_IN_DEV === "true",

        beforeSend: (event, hint) => {
          // Filter out common browser errors
          const ignorePatterns = [
            /ResizeObserver/,
            /Loading chunk/,
            /Network Error/,
          ];

          if (
            ignorePatterns.some((pattern) => pattern.test(event.message || ""))
          ) {
            return null;
          }

          // Ensure all error data is preserved (unmasked)
          // This ensures full error details are sent to Sentry
          return event;
        },
      });
    });
  }, []);
  return null;
}
