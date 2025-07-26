"use server";

import { createAndSendActivation } from "@/lib/activation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { postSignupProcess } from "./postSignupProcess";
import { logError } from "@/lib/errorHandling";

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
      return { ok: false, error: "User already exists" };
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

    await createAndSendActivation({
      userId: user.id,
      email,
      fullname: user.fullname,
      supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
    });

    // Start post-signup processes
    await postSignupProcess(user.id, fullname);

    return { ok: true, error: null };
  } catch (error) {
    logError(error, {
      action: "auth/signup",
      email,
      fullname,
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
    });
    return { ok: false, error: "Something went wrong. Please try again." };
  }
};
