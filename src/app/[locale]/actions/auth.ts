"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateActivationCode } from "../auth/verify/generateActivationCode";
import { EmailTemplate } from "../auth/components/EmailTemplate";
import { sendEmail } from "../auth/components/emailService";

export const signup = async ({
  fullname,
  email,
  password,
}: {
  fullname: string;
  email: string;
  password: string;
}) => {
  try {
    // Check if user already exists
    const existingUser = await prisma?.user?.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });

    const activationCode = generateActivationCode();
    await prisma.activationCode.create({
      data: {
        code: activationCode,
        userId: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expires in 15 minutes
      },
    });
    const htmlContent = EmailTemplate({
      user: user.fullname,
      activationCode: activationCode,
    });

    // Send activation email
    await sendEmail({
      from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
      to: email,
      subject: "Activate Your Account",
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
