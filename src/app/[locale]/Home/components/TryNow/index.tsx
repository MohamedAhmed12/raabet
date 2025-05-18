import { Prosbar } from "@/components/Prosbar";
import { ContentSection } from "./ContentSection";
import { ImageSection } from "./ImageSection";

export const TryNow = () => {
  return (
    <>
      <Prosbar bgColorClass="bg-[#d9acfd]" />
      <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-light-orange">
        <ImageSection />
        <ContentSection />
      </div>
    </>
  );
};
