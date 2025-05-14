export const MainTitle = ({
  title,
  subTitle,
}: Readonly<{
  title: string;
  subTitle: string;
}>) => (
  <div className="flex flex-col items-center py-11 px-[22]">
    <span className="text-[32px] text-deep-blue-gray font-normal capitalize leading-none">
      {title}
    </span>
    <span className="mt-[12px] text-[20px] text-[#727272] leading-none text-center md:text-">
      {subTitle}
    </span>
  </div>
);
