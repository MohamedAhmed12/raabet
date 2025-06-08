import { iconNameType } from "@/assets/icons";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { Icon } from "./Icon";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  colorClass?: string;
  bgColorClass: string;
}
interface Message {
  text: string;
  icon: iconNameType;
}

const messages: Message[] = [
  { text: "block", icon: "appWindow" },
  { text: "live", icon: "clock8" },
  { text: "Customizable", icon: "handHelping" },
  { text: "block", icon: "appWindow" },
  { text: "live", icon: "clock8" },
  { text: "Customizable", icon: "handHelping" },
  { text: "block", icon: "appWindow" },
  { text: "live", icon: "clock8" },
  { text: "Customizable", icon: "handHelping" },
  { text: "block", icon: "appWindow" },
  { text: "live", icon: "clock8" },
  { text: "Customizable", icon: "handHelping" },
];

const MemoizedIcon = React.memo(Icon);

const MemoizedPros = React.memo(() => (
  <div className="flex">
    {[...messages, ...messages].map(({ text, icon }, index) => (
      <div key={index} className="flex items-center text-xl lg:text-2xl">
        <MemoizedIcon name={icon} size={30} width={48} />
        <p className="px-8">
          {useTranslations("HomePage.AnimatedBar.Prosbar")(text)}
        </p>
      </div>
    ))}
  </div>
));

export const Prosbar = ({
  colorClass = "text-deep-blue-gray",
  bgColorClass,
}: Props) => {
  return (
    <div
      className={cn(
        "flex min-h-[60px] lg:min-h-[102px] max-w-full py-4 overflow-hidden font-bold uppercase tracking-wide font-noto-sans border border-y-black",
        colorClass,
        bgColorClass
      )}
    >
      <Marquee direction="right" speed={50} autoFill={false} pauseOnHover={true} gradient={false}>
        <MemoizedPros />
      </Marquee>
    </div>
  );
};
