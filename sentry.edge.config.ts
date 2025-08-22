import { getSentryConfig } from "@/lib/utils";
import * as Sentry from "@sentry/nextjs";

const { isDevelopment, dsn, environment } = getSentryConfig();

Sentry.init({
  dsn,
  environment,
  tracesSampleRate: isDevelopment ? 1.0 : 0.2, // Lower for edge
  debug: isDevelopment,
  enableLogs: isDevelopment,

  beforeSend: (event) => {
    if (isDevelopment) {
      event.debug_meta = undefined;
    }
    return event;
  },

  integrations: [
    Sentry.extraErrorDataIntegration(),
    // Simpler integration for edge runtime
    ...(isDevelopment
      ? [Sentry.captureConsoleIntegration({ levels: ["error"] })]
      : []),
  ],
});
