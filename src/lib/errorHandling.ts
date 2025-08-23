import * as Sentry from "@sentry/nextjs";
import { getSentryConfig } from "./utils";

type ErrorContext = {
  action: string;
  [key: string]: any;
};

/**
 * Logs an error to both console and Sentry
 * @param error The error object or message to log
 * @param context Additional context about where the error occurred
 * @param level The severity level of the error
 */
export function logError(
  error: unknown,
  context: ErrorContext,
  level: "error" | "warning" | "info" = "error"
): void {
  const { isDevelopment } = getSentryConfig();
  // Extract error message and stack trace
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  // Log to console
  const logMessage = `[${context.action.toUpperCase()}] ${errorMessage}`;

  switch (level) {
    case "warning":
      console.warn(logMessage, { context, stack });
      break;
    case "info":
      console.info(logMessage, { context });
      break;
    default: // error
      console.error(logMessage, { context, stack });
  }

  // Skip Sentry in development unless explicitly enabled
  if (
    isDevelopment &&
    process.env.NEXT_PUBLIC_ENABLE_SENTRY_IN_DEV === "true"
  ) {
    return;
  }

  // Capture the error with the appropriate level
  if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    const errorToSend = new Error(errorMessage);
    errorToSend.name = "CustomError";
    if (stack) errorToSend.stack = stack;
    Sentry.captureException(errorToSend);
  }
}

/**
 * Helper function to wrap async operations with error handling
 * @param fn The async function to execute
 * @param context Context about the operation
 * @returns The result of the function or an error object
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context: ErrorContext
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    logError(error, context);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
