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
        "flex flex-col items-center justify-center text-center p-[3.5vw] h-[460px] w-1/2",
        className
      )}
    >
      <div className="relative !w-16 !h-16">
        <Image src={src} fill alt={alt} className="mb-4" />
      </div>
      <p className="text-[24px] font-bold">{Title}</p>
      <p className="text-[16px]">{label}</p>
    </div>
  );
};
