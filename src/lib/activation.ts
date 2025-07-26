"use server";

import { sendEmail } from "@/app/[locale]/auth/components/emailService";
import { EmailTemplate } from "@/app/[locale]/auth/components/EmailTemplate";
import { generateActivationCode } from "@/app/[locale]/auth/verify/generateActivationCode";
import prisma from "@/lib/prisma";
import { logError } from "./errorHandling";

/**
 * Generates an activation code, saves it to DB, sends activation email.
 * @param userId - The user's ID (string)
 * @param email - The user's email address
 * @param fullname - The user's full name
 * @param generateActivationCode - Function to generate the code
 * @param supportEmail - The support email to use as sender
 * @returns The activation code (string)
 */
export async function createAndSendActivation({
  userId,
  email,
  fullname,
  supportEmail,
}: {
  userId: string;
  email: string;
  fullname: string;
  supportEmail: string;
}) {
  try {
    const activationCode = generateActivationCode();

    // Create activation code in database
    await prisma.activationCode.create({
      data: {
        code: activationCode,
        userId,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expires in 15 minutes
      },
    });

    // Generate email content
    const htmlContent = EmailTemplate({
      user: fullname,
      activationCode: activationCode,
    });

    // Send activation email
    await sendEmail({
      from: supportEmail,
      to: email,
      subject: "Activate Your Account",
      html: htmlContent,
    });

    return activationCode;
  } catch (error) {
    logError(error, {
      action: "createAndSendActivation",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      userId,
      email,
      fullname,
    });

    // Re-throw with a user-friendly message
    throw new Error("Failed to create and send activation. Please try again.");
  }
}
