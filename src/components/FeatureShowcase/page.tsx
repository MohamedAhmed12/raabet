import { ConetentCompontent } from "./ConetentCompontent";
import { ImageComponent } from "./ImageComponent";
import { LabelComponent } from "./LabelComponent";

const OverviewShowcase = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* first Section */}
      
      <div className="flex items-center w-full ">
        <LabelComponent
          titleLabel="Why choose"
          coloredLabel="Liinks"
          mainLabel="With our robust customization options and powerful block types, your profile will stand out from the noise. We're also more affordable than the competition, and a great choice for teams."
          buttonLabel="Get Started"
          underlineColor="bg-[#7ed0ff]"
          widthClass="w-[600px]"
          className="w-1/2"
        />

        {/* right Component of first section */}
        <ConetentCompontent/>
        
        </div>
      {/* second Section */}
      
      <div className="flex flex-col md:flex-row items-center justify-center">
        <ImageComponent
          src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/feature-instagram-1.png"
          alt="second Section"
        />
        <LabelComponent
          titleLabel="Auto-publish from"
          coloredLabel="Instagram"
          mainLabel="Automatically add links from the captions of new Instagram posts. Never again worry about your followers having to manually type a link in their browser."
          buttonLabel="Get Started"
          underlineColor="bg-[#d9acfd]"
          className=""
          widthClass="w-[500px]"
          />
      </div>

      {/* third Section */}
      
      <div className="flex flex-col md:flex-row items-center justify-center">
        <LabelComponent
          titleLabel="Group blocks into a"
          coloredLabel="folder"
          mainLabel="Use folders to group relevant blocks and keep your page feeling organized and fresh."
          buttonLabel="Get Started"
          underlineColor="bg-[#feeb96]"
          widthClass="w-[500px]"
          />
        <ImageComponent
          src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/feature-folder-1.png"
          alt="third Section"
        />
      </div>
    </div>
  );
};

export default OverviewShowcase;
