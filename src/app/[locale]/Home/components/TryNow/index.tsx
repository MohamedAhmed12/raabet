import { Prosbar } from "@/components/Prosbar";
import { ContentSection } from "./ContentSection";
import { ImageSection } from "./ImageSection";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const TryNow = () => {
  return (
    <>
      <Prosbar bgColorClass="bg-[#d9acfd]" />
      <div className="flex flex-col-reverse lg:flex-row bg-light-orange">
        {/* First Child: Image */}
        {/* <div className="flex justify-center items-center w-full md:w-1/2 flex-1"> */}
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
        {/* </div> */}
        {/* <div className="flex justify-center w-full md:w-1/2 px-[7vw] py-[32px] flex-1"> */}
        <ContentSection />
        {/* </div> */}
      </div>
    </>
  );
};
