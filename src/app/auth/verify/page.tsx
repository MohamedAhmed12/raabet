// // app/auth/verify/page.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function VerifyPage() {
//   const [activationCode, setActivationCode] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email"); // Get email from query parameter

//   const handleVerify = async () => {
//     if (!email) {
//       setError("Email is required.");
//       return;
//     }

//     setLoading(true);
//     const response = await fetch("/api/email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, activationCode }),
//     });

//     const data = await response.json();
//     if (data.message === "Account activated successfully.") {
//       router.push("/auth/login");
//     } else {
//       setError(data.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>Verify Your Account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error && <p className="text-red-500 mb-3">{error}</p>}
//           <div className="grid gap-3">
//             <Input
//               type="text"
//               placeholder="Activation Code"
//               value={activationCode}
//               onChange={(e) => setActivationCode(e.target.value)}
//             />
//             <Button onClick={handleVerify} disabled={loading}>
//               {loading ? "Verifying..." : "Verify"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { EmailTemplate } from "../components/EmailTemplate";
// import { generateActivationCode } from "./generateActivationCode";

// export default function Home() {
//   const [result, setResult] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState<boolean>(false);

//   const sendEmail = async () => {
//     setLoading(true);
    
//     const code = generateActivationCode();
//     const htmlContent = EmailTemplate({
//       user: "Mazen",
//       activationCode: code,
//     });

//     fetch("/api/email", {
//       method: "POST",
//       body: JSON.stringify({
//         from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
//         to: "dsaf@gmial.com",
//         html: htmlContent,
//       }),
//     })
//       .then(async (response) => {
//         console.log(await response.json());
//       })
//       .then((data) => {
//         console.log(data);
//       })
//       // .then((data) => setResult(data))
//       .catch((error) => setResult(error))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="p-4">
//       <div className="my-4">{JSON.stringify(result)}</div>

//       {loading && <div className="my-4">Processing...</div>}

//       <button className="bg-blue-500 rounded p-3" onClick={sendEmail}>
//         Send Email
//       </button>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function VerifyPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const email = session?.user?.email; // Get email from session

//   // Handle verification
//   const handleVerify = async () => {
//     if (!email) return;
//     console.log("email", email);
    
//     setLoading(true);
//     setError("");
//     setMessage("");

//     const response = await fetch("/api/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, code }), // Send email & code
//     });

//     const data = await response.json();
//     setLoading(false);

//     if (!response.ok) {
//       setError(data.error || "Invalid activation code.");
//       return;
//     }

//     setMessage("Account verified! Redirecting to login...");
//     setTimeout(() => {
//       router.push("/login");
//     }, 2000);
//   };

//   // Resend activation code
//   const resendCode = async () => {
//     if (!email) return;

//     setLoading(true);
//     setError("");
//     setMessage("");

//     const response = await fetch("/api/email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();
//     setLoading(false);

//     if (!response.ok) {
//       setError(data.error || "Failed to send activation code.");
//       return;
//     }

//     setMessage("New activation code sent! Check your email.");
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-lg font-bold mb-2">Email Verification</h2>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : email ? (
//         <div className="border p-2 w-full bg-gray-100 text-gray-700 rounded mb-2">
//           {email}
//         </div>
//       ) : (
//         <p className="text-red-500">No session found. Please log in.</p>
//       )}

//       <input
//         type="text"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         className="border p-2 w-full mt-4"
//         placeholder="Enter activation code..."
//       />

//       <button
//         onClick={handleVerify}
//         className="bg-green-500 text-white p-2 rounded w-full mt-2"
//         disabled={loading || !email}
//       >
//         {loading ? "Verifying..." : "Verify"}
//       </button>

//       <button
//         onClick={resendCode}
//         className="bg-blue-500 text-white p-2 rounded w-full mt-2"
//         disabled={loading || !email}
//       >
//         {loading ? "Resending..." : "Resend Code"}
//       </button>

//       {message && <div className="text-green-500 mt-2">{message}</div>}
//       {error && <div className="text-red-500 mt-2">{error}</div>}
//     </div>
//   );
// }

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VerifyForm from "./verifyForm";

export default async function VerifyPage() {
  const session = await getServerSession(authOptions);

  console.log("Session Data:", session);


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
