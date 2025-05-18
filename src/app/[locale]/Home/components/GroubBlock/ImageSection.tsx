import Image from "next/image";

export const ImageSection = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative flex justify-center items-center h-full w-full md:w-1/2">
      <Image
        src={src}
        width={500}
        height={600}
        alt={alt}
        className="h-full w-full" 
      />
    </div>
  );
};
