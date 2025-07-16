import { sendEmail } from "@/app/[locale]/auth/components/emailService";
import { EmailTemplate } from "@/app/[locale]/auth/components/EmailTemplate";
import prisma from "@/lib/prisma";

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
  generateActivationCode,
  supportEmail,
}: {
  userId: string;
  email: string;
  fullname: string;
  generateActivationCode: () => string;
  supportEmail: string;
}) {
  const activationCode = generateActivationCode();
  await prisma.activationCode.create({
    data: {
      code: activationCode,
      userId,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expires in 15 minutes
    },
  });
  const htmlContent = EmailTemplate({
    user: fullname,
    activationCode: activationCode,
  });
  await sendEmail({
    from: supportEmail,
    to: email,
    subject: "Activate Your Account",
    html: htmlContent,
  });
  return activationCode;
}
