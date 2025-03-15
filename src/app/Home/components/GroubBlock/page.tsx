import { ContentSection } from "../ContentSection";
import { ImageSection } from "./ImageSection";


export const GroubBlock = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <ImageSection
        src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/feature-folder-1.png"
        alt="third Section"
      />
      <ContentSection
        titleLabel="Group blocks into a"
        coloredLabel="folder"
        mainLabel="Use folders to group relevant blocks and keep your page feeling organized and fresh."
        buttonLabel="Get Started"
        underlineColor="bg-[#feeb96]"
        widthClass="w-[500px]"
        redirectUrl="/pricing"
      />
    </div>
  );
};

 
