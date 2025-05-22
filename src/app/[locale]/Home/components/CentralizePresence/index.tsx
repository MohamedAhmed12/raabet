import { ContentSection } from "./ContentSection";
import { ImageSection } from "./ImageSection";

export const CentralizePresence = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <ContentSection />
      <ImageSection />
    </div>
  );
};
