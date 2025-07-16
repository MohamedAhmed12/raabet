"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateActivationCode } from "../auth/verify/generateActivationCode";
import { createAndSendActivation } from "@/lib/activation";
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

    await createAndSendActivation({
      userId: user.id,
      email,
      fullname: user.fullname,
      supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
    });

    // Start post-signup processes
    await postSignupProcess(user.id, fullname);

    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
