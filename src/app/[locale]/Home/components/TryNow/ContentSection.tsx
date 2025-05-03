import { Claim } from "../Claim";

export const ContentSection = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col font-noto-sans py-8 px-[7vw] text-left">
      <div className="text-[64px] text-deep-blue-gray font-bold leading-[1.1]">
        <span className="mr-4">Try Raabet</span>
        <span className="relative">
          <span className="relative inline-block z-[1]">now!</span>
          <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-white"></div>
        </span>
      </div>

      <Claim />
    </div>
  );
};
