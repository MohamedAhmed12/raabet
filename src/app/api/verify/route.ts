import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import NextAuth config
import prisma from "@/lib/prisma"; // Import Prisma instance

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

// Helper to get locale from request (cookie, header, or fallback)
function getLocale(req: NextRequest): "en" | "ar" {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "ar") return "ar";
  return "en";
}

// Helper to get translation messages
function getMessages(locale: "en" | "ar") {
  return locale === "ar" ? ar : en;
}

export async function POST(req: NextRequest) {
  const locale = getLocale(req);
  const messages = getMessages(locale);
  const t = (key: keyof typeof messages.VerifyErrors) => messages.VerifyErrors[key];

  try {
    // Get session email
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: t("unauthorized") }, { status: 401 });
    }
    const email = session.user.email;

    // Extract code from request
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: t("activation_code_required") }, { status: 400 });
    }

    // Get the latest activation code for the user
    const activationCode = await prisma.activationCode.findFirst({
      where: { user: { email }, used: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" }, // Fetch the latest code
    });

    if (!activationCode) {
      return NextResponse.json({ error: t("no_activation_code") }, { status: 404 });
    }

    // Check if the provided code matches the latest activation code
    if (activationCode.code !== code) {
      return NextResponse.json({ error: t("invalid_activation_code") }, { status: 400 });
    }

    // Mark the user as confirmed and activation code as used
    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { is_confirmed: true }, // Mark user as confirmed
      }),
      prisma.activationCode.update({
        where: { id: activationCode.id },
        data: { used: true }, // Mark activation code as used
      }),
    ]);

    return NextResponse.json({ message: "Account verified successfully!" });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: t("internal_server_error") }, { status: 500 });
  }
}
