import { UpgradePlanBanner } from "./components/UpgradePlanBanner";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-noto-sans">
      <UpgradePlanBanner />
      <div className="flex container pt-[44px]">{children}</div>
    </div>
  );
}
