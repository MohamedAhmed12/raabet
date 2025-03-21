export const DashboardContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className="font-noto-sans pt-[44px] w-[calc(100%+(-66px))] mx-auto max-w-[650px]">{children}</div>
);
