import { Prosbar } from "@/components/Prosbar";
import { ContentSection } from "./ContentSection";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const TryNow = () => {
  return (
    <>
      <Prosbar bgColorClass="bg-[#d9acfd]" />
      <div className="flex flex-col-reverse lg:flex-row bg-light-orange">
        <div className="relative flex justify-end flex-1 md:flex-1/2 min-h-[80vh] overflow-hidden py-8 px-[7vw]">
          <Image
            src="/images/colored-links-page-preview.png"
            alt="try now"
            width={200}
            height={200}
            className={cn(
              "w-[95%] m-auto",
              "lg:h-[105%] lg:absolute lg:right-0 lg:bottom-[-90px] lg:w-[70%]"
            )}
          />
        </div>
        <ContentSection />
      </div>
    </>
  );
};
