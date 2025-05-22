import Image from "next/image";

export const ImageSection = () => {
  return (
    <div className="relative flex justify-end h-full w-full md:w-1/2 overflow-hidden md:mt-20 md:ml-24">
      <Image
        src="/images/colored-links-page-preview.png"
        alt="Hero Image"
        width={620}
        height={700}
        className="h-[700] w-[620]"
      />
    </div>
  );
};
