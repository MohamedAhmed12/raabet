import { cn } from "@/lib/utils";
import { AppWindow, Clock8, HandHelping } from "lucide-react";
import Marquee from "react-fast-marquee";

const messages = [
  { text: "Powerful Block Builder", icon: AppWindow },
  { text: "Go Live in Minutes", icon: Clock8 },
  { text: "Fully Customizable", icon: HandHelping },
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
        "bg-[#fed396] py-4 overflow-hidden font-bold uppercase tracking-wide font-noto-sans",
        colorClass,
        bgColorClass
      )}
    >
      <Marquee autoFill speed={10} gradientWidth={300} className="flex">
        {/* Duplicate messages for an infinite loop */}
        {messages.map(({ text, icon: Icon }, index) => (
          <div key={index} className="flex items-center text-2xl">
            <Icon size={30} width={48} height={"auto"} />
            <p className="px-8">{text}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
