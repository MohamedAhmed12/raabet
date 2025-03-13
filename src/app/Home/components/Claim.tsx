import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

export const Claim = () => {
  return (
    <div className="flex items-center rounded-[100px] border border-[#1d1d28] shadow-[3px_3px_0px_#1d1d28] bg-white cursor-text p-2 my-8 font-noto-sans font-semibold">
      <Link
        size={40}
        width={40}
        strokeWidth={3}
        className="mx-4 text-[#1b97f5]"
        fontWeight={800}
      />
      <span className="mr-[2px]">liinks.co/</span>
      <Input
        type="text"
        placeholder="name"
        className={cn(
          "bg-none border-none shadow-none pl-0",
          "focus:ring-0 focus:rounded-none focus:outline-none",
          "focus-visible:ring-0 focus-visible:rounded-none focus-visible:outline-none"
        )}
      />

      <button
        className={cn(
          "bg-deep-blue-gray text-white px-6 py-3 rounded-4xl font-bold"
        )}
      >
        Claim
      </button>
    </div>
  );
};
