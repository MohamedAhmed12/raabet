import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import NextAuth config
import { prisma } from "@/lib/prisma"; // Import Prisma instance

export async function POST(req: NextRequest) {
  try {
    // Get session email
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email;

    // Extract code from request
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Activation code is required." }, { status: 400 });
    }

    // Get the latest activation code for the user
    const activationCode = await prisma.activationCode.findFirst({
      where: { user: { email }, used: false },
      orderBy: { createdAt: "desc" }, // Fetch the latest code
    });

    if (!activationCode) {
      return NextResponse.json({ error: "No activation code found." }, { status: 404 });
    }

    // Check if the provided code matches the latest activation code
    if (activationCode.code !== code) {
      return NextResponse.json({ error: "Invalid activation code." }, { status: 400 });
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
