import Image from "next/image";

export const ImageSection = ({ src, alt }: { src: string; alt: string; }) => {
  return (
    <div className="flex justify-end h-full w-full md:w-1/2">
      <Image src={src} alt={alt}  />
    </div>
  );
};
