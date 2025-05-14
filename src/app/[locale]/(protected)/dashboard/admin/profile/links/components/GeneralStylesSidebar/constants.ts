import {iconNameType} from "@/assets/icons";

export const cardDesigns: {
  value: string;
  icon: iconNameType;
  className: string;
}[] = [
  {value: "0", icon: "circle-x", className: ""},
  {
    value: "1",
    icon: "card-design-1",
    className:
      "border-[rgb(236,51,80)] shadow-[rgb(255,56,87)_-5px_-5px_13px,_rgb(194,42,66)_5px_5px_13px] border-0 rounded-[28px] mb-[26px] mr-0",
  },
  {
    value: "2",
    icon: "card-design-2",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-5 before:bg-white before:rounded-full",
  },
  {
    value: "3",
    icon: "card-design-3",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-0 before:w-full before:h-5 before:bg-white before:clip-path-wave",
  },
  {
    value: "4",
    icon: "card-design-4",
    className:
      "relative rounded-lg shadow-md before:absolute before:content-[''] before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-5 before:bg-white before:clip-path-notch",
  },
];
