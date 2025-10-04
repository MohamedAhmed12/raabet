export const MainTitle = ({
  title,
  subTitle,
  className,
}: Readonly<{
  title: string;
  subTitle: string;
  className?: string;
}>) => (
  <div className={`flex flex-col items-center py-11 px-[22] ${className || ''}`}>
    <span className="text-[32px] text-deep-blue-gray font-normal capitalize leading-none mb-1">
      {title}
    </span>
    <span className="mt-[12px] text-[20px] text-[#727272] leading-none text-center md:text-">
      {subTitle}
    </span>
  </div>
);
