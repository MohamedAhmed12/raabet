/**
 * Formats a username by converting to lowercase, replacing spaces with dots,
 * and removing invalid characters.
 * @param input The input string to format as a username
 * @returns Formatted username string
 */
export const formatUsername = (input: string): string => {
  // Convert to lowercase and replace spaces with dots
  let formatted = input.toLowerCase().replace(/\s+/g, ".");
  // Remove any characters that are not letters, numbers, periods, or underscores
  formatted = formatted.replace(/[^a-z0-9._]/g, "");
  // Ensure it doesn't start or end with a dot or underscore
  formatted = formatted.replace(/^[._]+/, "").replace(/[._]+$/, "");
  // Replace multiple dots/underscores with a single dot
  formatted = formatted.replace(/[._]+/g, ".");
  return formatted;
};
