import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLocale } from "next-intl";

export const ImageSection = () => {
  const locale = useLocale();
  return (
    <div
      className={cn(
        "relative flex justify-end w-full lg:w-1/2 lg:min-h-[calc(100vh-70px-72px)] bg-[#7ed0ff]",
        "lg:bg-transparent py-8 px-[7vw] lg:p-0"
      )}
    >
      <Image
        src="/images/image-section-bg.png"
        fill
        alt="Hero Image"
        className={cn(
          "w-full !relative",
          "lg:!h-[87%] lg:!max-h-[40vw] lg:!absolute lg:!w-[90vh] lg:!left-1/2 lg:!top-1/2 lg:!-translate-x-1/2 lg:!-translate-y-1/2 !right-[unset] !bottom-[unset]"
        )}
      />

      {/* Background Section */}
      <div
        className={cn(
          "w-full md:w-1/2 bg-[#7ed0ff] hidden lg:block",
          locale === "ar" ? "border-l" : "border-r"
        )}
      />
    </div>
  );
};
