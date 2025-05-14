import Image from "next/image";

export const ImageSection = () => {
  return (
    <div className="relative flex flex-row-reverse w-full md:w-1/2 min-h-[calc(100vh-70px-72px)]">
      {/* Hero Image */}
      <Image
        src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/hero-graphic.png"
        alt="Hero Image"
        className="w-full h-auto md:h-[85%] md:max-h-[40vw] md:w-[675] py-8 px-[7vw] md:p-0 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
      />

      {/* Background Section */}
      <div className="w-full md:w-1/2 border-l border-[#1d1d28] bg-[#7ed0ff]" />
    </div>
  );
};
