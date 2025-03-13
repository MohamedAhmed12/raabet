import {
  AppWindow,
  Check,
  Clock8,
  HandHelping,
  Link,
  Star,
  X,
} from "lucide-react";

const icons = {
  link: Link,
  star: Star,
  appWindow: AppWindow,
  clock8: Clock8,
  handHelping: HandHelping,
  check: Check,
  x: X,
};

export type iconNameType = keyof typeof icons;
export default icons;
