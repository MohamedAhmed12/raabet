import { cn } from "@/lib/cn";
import Link from "next/link";

export const ContentSection = ({
  titleLabel,
  coloredLabel,
  mainLabel,
  buttonLabel,
  className,
  underlineColor,
  widthClass,
  redirectUrl,
}: {
  titleLabel: string;
  coloredLabel: string;
  mainLabel: string;
  buttonLabel: string;
  className?: string;
  underlineColor: string;
  widthClass?: string;
  redirectUrl: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full md:w-1/2 font-noto-sans px-[7vw] flex justify-center items-center",
        className
      )}
    >
      <div className={widthClass}>
        <div className="mb-6 text-[64px] text-deep-blue-gray font-bold leading-[1.1]">
          <span className="mr-4">{titleLabel}</span>
          <span className="relative">
            <span className="relative inline-block z-[1]">{coloredLabel}</span>
            <div
              className={cn(
                "absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] ",
                underlineColor
              )}
            ></div>
          </span>
        </div>
        <div className="3xl mb-6">{mainLabel}</div>
        <Link href={redirectUrl}>
          <button className="bg-deep-blue-gray text-white px-6 py-3 rounded-4xl font-bold inline-block cursor-pointer transition-all duration-300">
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
};
