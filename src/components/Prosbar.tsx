import { iconNameType } from "@/assets/icons";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { Icon } from "./Icon";

const messages: { text: string; icon: iconNameType }[] = [
  { text: "Powerful Block Builder", icon: "appWindow" },
  { text: "Go Live in Minutes", icon: "clock8" },
  { text: "Fully Customizable", icon: "handHelping" },
];

export const Prosbar = ({
  colorClass = "text-deep-blue-gray",
  bgColorClass,
}: {
  colorClass?: string;
  bgColorClass: string;
}) => {
  return (
    <div
      className={cn(
        "bg-light-orange py-4 overflow-hidden font-bold uppercase tracking-wide font-noto-sans border border-black",
        colorClass,
        bgColorClass
      )}
    >
      <Marquee autoFill speed={10} gradientWidth={300} className="flex">
        {/* Duplicate messages for an infinite loop */}
        {messages.map(({ text, icon }, index) => (
          <div key={index} className="flex items-center text-2xl">
            <Icon name={icon} size={30} width={48} height={"auto"} />
            <p className="px-8">{text}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
