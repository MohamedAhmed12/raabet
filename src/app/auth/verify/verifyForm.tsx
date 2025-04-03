"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyForm({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("✅ Activation successful!");
      setTimeout(() => router.replace("/auth/login"), 2000);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter activation code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
