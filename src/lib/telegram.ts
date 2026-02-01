/**
 * Send a message to your Telegram chat via Telegram Bot API.
 * Used for admin notifications (e.g. new registration).
 *
 * Required env vars:
 * - TELEGRAM_BOT_TOKEN: from @BotFather
 * - TELEGRAM_CHAT_ID: your chat ID (e.g. from @userinfobot or getUpdates)
 */

const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn(
      "[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing. Add both to .env and restart the server."
    );
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const body = await res.text();

    if (!res.ok) {
      console.error("[Telegram] sendMessage failed:", res.status, body);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Telegram] sendMessage error:", error);
    return false;
  }
}

/**
 * Send a new registration notification to your Telegram.
 * Call this after a user successfully signs up.
 */
export function sendNewRegistrationNotification(
  username: string,
  email: string
): void {
  const text = [
    "🆕 <b>New registration</b>",
    "",
    `<b>Username:</b> ${escapeHtml(username)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
  ].join("\n");

  sendTelegramMessage(text)
    .then((ok) => {
      if (ok) console.log("[Telegram] New registration notification sent.");
      else console.warn("[Telegram] New registration notification failed (see above).");
    })
    .catch((err) => {
      console.error("[Telegram] New registration notification error:", err);
    });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
