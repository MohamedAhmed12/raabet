import { ContentSection } from "./ContentSection";
import { ImageSection } from "./ImageSection";

export const TryNow = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-[#fed396]">
      <ImageSection />
      <ContentSection />
    </div>
  );
};
