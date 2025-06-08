import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import Link from 'next/link';

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
        'flex justify-center items-center w-full md:w-1/2 font-noto-sans py-[32px] px-[7vw] border border-t-[#1d1d28]',
        className
      )}
    >
      <div className={widthClass}>
        <div className="flex justify-center md:justify-start text-center md:text-start mb-6 ">
          <div className="text-[45px] lg:text-[64px] text-deep-blue-gray font-bold leading-[1.1] text-center md:text-start">
            <span className="mr-4">{titleLabel}</span>
            <span className="relative">
              <span className="relative inline-block z-[1]">
                {coloredLabel}
              </span>
              <div
                className={cn(
                  'absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%]',
                  underlineColor
                )}
              ></div>
            </span>
          </div>
        </div>
        <div className="flex text-center md:text-start mb-6">{mainLabel}</div>
        <Link
          href={redirectUrl}
          className="flex justify-center md:justify-start"
        >
          <Button className="text-white px-7 py-6 rounded-4xl font-bold mt-8 bg-deep-blue-gray hover:bg-deep-blue-gray">
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
};
