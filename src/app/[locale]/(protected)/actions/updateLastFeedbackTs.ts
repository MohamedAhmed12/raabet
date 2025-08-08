"use server";

import prisma from "@/lib/prisma";
import { logError } from "@/lib/errorHandling";

export async function updateLastFeedbackTs(linkId: string) {
  try {
    await prisma.link.update({
      where: { id: linkId },
      data: { last_feedback_ts: new Date() },
    });
    return { success: true };
  } catch (error: unknown) {
    logError(error, {
      context: "updateLastFeedbackTs",
      linkId,
    });
    return { success: false, error };
  }
}
