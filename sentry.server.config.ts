import { getSentryConfig } from "@/lib/utils";
import * as Sentry from "@sentry/nextjs";
import type { ErrorEvent, EventHint } from "@sentry/nextjs";

const { isDevelopment, dsn, environment } = getSentryConfig();

Sentry.init({
  dsn,
  environment,
  // More conservative sampling in production
  tracesSampleRate: isDevelopment ? 1.0 : 0.2,
  // Only enable debug in development
  debug:
    isDevelopment && process.env.NEXT_PUBLIC_ENABLE_SENTRY_IN_DEV === "true",
  // Enable logs only in development to reduce noise
  enableLogs: isDevelopment,

  beforeSend: (event: ErrorEvent, hint: EventHint) => {
    // Filter out health check errors or common non-actionable errors
    const originalError = hint.originalException as Error;
    if (originalError?.message?.includes("health")) {
      return null;
    }

    if (isDevelopment) {
      console.log("Sentry event (server):", event);
      // Remove debug meta to avoid symbolication issues
      event.debug_meta = undefined;
    }

    return event;
  },

  integrations: [
    Sentry.extraErrorDataIntegration(),
    Sentry.captureConsoleIntegration({
      levels: ["error"], // Only capture errors in production
    }),
    // Add context integration for better debugging
    Sentry.contextLinesIntegration({
      frameContextLines: 5,
    }),
  ],

  // Add release information for better tracking
  release: process.env.npm_package_version,
});
