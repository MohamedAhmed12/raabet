import Image from "next/image";

export const ImageSection = () => {
  return (
    <div className="flex justify-end relative md:w-1/2 pt-[80px]">
      <Image
        src="/images/colored-links-page-preview.png"
        alt="Hero Image"
        fill
        className="!h-100 !w-[37vw]"
      />
    </div>
  );
};
