"use server";

import { createAndSendActivation } from "@/lib/activation";
import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";
import { postSignupProcess } from "./postSignupProcess";

export const signup = async ({
  fullname,
  email,
  password,
}: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const t = await getTranslations("Auth");

  try {
    // Check if user already exists
    const existingUser = await prisma?.user?.findFirst({
      where: { OR: [{ email }, { fullname }] },
    });

    if (existingUser) {
      return { ok: false, error: t("userAlreadyExists") };
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

    createAndSendActivation({
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
    return { ok: false, error: t("somethingWentWrong") };
  }
};
