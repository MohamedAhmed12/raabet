import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VerifyForm from "./verifyForm";

export default async function VerifyPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return <p>You must be logged in to verify your account.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Verify Your Account</h2>
      <p className="mb-4">Your email: <strong>{session.user.email}</strong></p>
      <VerifyForm email={session.user.email} />
    </div>
  );
}
