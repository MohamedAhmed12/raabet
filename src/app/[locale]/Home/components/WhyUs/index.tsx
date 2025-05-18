import { ContentSection } from "../ContentSection";
import { WhyUsBlock } from "./components/whyUsBlock";

export const WhyUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full">
      <ContentSection
        titleLabel="Why choose"
        coloredLabel="Liinks"
        mainLabel="With our robust customization options and powerful block types, your profile will stand out from the noise. We're also more affordable than the competition, and a great choice for teams."
        buttonLabel="Get Started"
        underlineColor="bg-[#7ed0ff]"
        widthClass="w-[600px]"
        className="w-full md:w-1/2 py-8"
        redirectUrl="/Signup"
      />

      <WhyUsBlock />
    </div>
  );
};
