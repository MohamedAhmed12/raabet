import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Image
        src="/chain-loader.svg"
        alt="Loading..."
        width={120}
        height={120}
        priority
        unoptimized
      />
    </div>
  );
}
