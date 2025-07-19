import { Icon } from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const Claim = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex items-center rounded-[100px] border border-[#1d1d28] shadow-[3px_3px_0px_#1d1d28] bg-white cursor-text p-2 mt-8 font-noto-sans font-semibold">
      <Icon
        name="link"
        size={40}
        strokeWidth={3}
        fontWeight={800}
        className="mx-4 text-[#1b97f5]"
      />
      <span className="mr-[2px]">rabet-link.com/</span>
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
        {t("claim")}
      </button>
    </div>
  );
};
