import { Prosbar } from "@/components/Prosbar";
import { ImageSection } from "../components/TryNow/ImageSection";
import { ContentSection } from "./ContentSection";

export const TryNow = () => {
  return (
    <>
      <Prosbar bgColorClass="bg-[#d9acfd]" />
      <div className="flex flex-col md:flex-row items-center justify-center bg-light-orange">
        <ImageSection />
        <ContentSection />
      </div>
    </>
  );
};
