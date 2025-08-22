import * as Sentry from "@sentry/nextjs";
import { getSentryConfig } from "@/lib/utils";

if (typeof window !== "undefined") {
  const { isDevelopment, dsn, environment } = getSentryConfig();

  Sentry.init({
    dsn,
    environment,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
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

    debug: isDevelopment && window.location.search.includes("debug=sentry"),

    beforeSend: (event) => {
      // Filter out common browser errors
      const ignorePatterns = [
        /ResizeObserver/,
        /Loading chunk/,
        /Network Error/,
      ];

      if (ignorePatterns.some((pattern) => pattern.test(event.message || ""))) {
        return null;
      }

      return event;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
