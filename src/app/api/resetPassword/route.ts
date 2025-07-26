import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Ensure JWT secret is available
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const message = `Server error: JWT secret is not set`;
      logError(message, {
        action: "resetPassword",
        errorType: "ValidationError",
      });
      return NextResponse.json({ message }, { status: 500 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
      const err = `JWT verification failed: ${error}`;
      logError(err, {
        action: "resetPassword",
        errorType: "ValidationError",
      });
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Validate token structure
    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      return NextResponse.json(
        { message: "Invalid token structure" },
        { status: 400 }
      );
    }

    const { email, exp } = decoded;
    if (!exp || Date.now() >= exp * 1000) {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 401 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { message: "New password cannot be the same as the old password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    const err = `Error in password reset: ${error}`;
    logError(err, {
      action: "resetPassword",
      errorType: "ValidationError",
    });
    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
