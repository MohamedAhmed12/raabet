export const DashboardContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className="flex flex-col items-center font-noto-sans pt-[44px] w-[calc(100%+(-66px))] mx-auto">{children}</div>
);
