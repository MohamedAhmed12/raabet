import {cn} from "@/lib/cn";
import Image from "next/image";

export const FeatureCard = ({
  src,
  alt,
  label,
  className,
  Title,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  Title: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-[3.5vw] h-full flex-1 border md:border-l-[#1d1d28] border-t-[#1d1d28]",
        className
      )}
    >
      <div className="relative w-auto h-[115px]">
        <Image src={src} height={115} width={105} alt={alt} className="mb-4" />
      </div>
      <p className="text-[24px] font-bold">{Title}</p>
      <p className="text-[16px]">{label}</p>
    </div>
  );
};
