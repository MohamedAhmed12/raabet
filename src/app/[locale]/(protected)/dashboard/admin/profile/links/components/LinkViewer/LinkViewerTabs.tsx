import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const tabs: {
  // text: string;
  value: string;
  icon: iconNameType;
}[] = [
  {
    value: "smartphone",
    icon: "smartphone",
  },
  {
    value: "airplay",
    icon: "airplay",
  },
];
export function LinkViewerTabs({
  selectedTab,
  onclick,
}: {
  selectedTab: number;
  onclick: (i: number) => void;
}) {
  const handleOnClick = (i: number) => {
    onclick(i);
  };

  return (
    <div className="hidden md:flex justify-center items-center w-full h-[21px]">
      <div className="grid w-fit py-[5px] px-[6px] mx-[6px] grid-cols-2 rounded-full border-1 border-[#d3d3d3]  bg-white">
        {tabs.map((tab, i) => (
          <Icon
            key={tab.value}
            name={tab.icon}
            className={cn(
              "mx-[6px] cursor-pointer text-gray-400",
              "!w-5 !h-5 hover:scale-110",
              selectedTab == i && "text-deep-blue-gray"
            )}
            onClick={() => handleOnClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
