import Image from "next/image";

export const ImageSection = ({ src, alt }: { src: string; alt: string; }) => {
  return (
    <div className="relative flex justify-center items-center !h-full !min-h-[650px] w-full md:w-1/2">
      <Image src={src} fill alt={alt}  />
    </div>
  );
};
