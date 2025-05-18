import {ContentSection} from "../ContentSection";
import {ImageSection} from "./ImageSection";

export const GroubBlock = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center w-full h-full">
      <ImageSection src="/images/links-page-preview.png" alt="third Section" />
      <ContentSection
        titleLabel="Group blocks into a"
        coloredLabel="folder"
        mainLabel="Use folders to group relevant blocks and keep your page feeling organized and fresh."
        buttonLabel="More features"
        underlineColor="bg-[#feeb96]"
        widthClass="w-[80%]"
        className="w-full md:w-1/2 py-8"
        redirectUrl="/pricing"
      />
    </div>
  );
};
