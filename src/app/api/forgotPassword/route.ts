import { sendEmail } from "@/app/[locale]/auth/components/emailService";
import { ForgetPasswordTemplate } from "@/app/[locale]/auth/components/ForgetPasswordTemplate";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

// Zod Schema for validation
const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .min(3, "Email or Full Name is required")
    .refine(
      (val) => !val.includes("@") || z.string().email().safeParse(val).success,
      { message: "Invalid email address" }
    ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier } = forgotPasswordSchema.parse(body);

    // Determine if identifier is an email
    const isEmail = identifier.includes("@");
    
    // Find user by email or full name (case insensitive)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: isEmail ? identifier : undefined },
          {
            fullname: isEmail
              ? undefined
              : { equals: identifier, mode: "insensitive" },
          },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const htmlContent = ForgetPasswordTemplate({
      user: user.fullname as string,
      token: token,
    });

    // Send reset password email
    await sendEmail({
      from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL as string,
      to: user.email,
      subject: "Reset Your Password",
      html: htmlContent,
    });

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
