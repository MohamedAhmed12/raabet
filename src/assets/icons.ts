import {
  AppWindow,
  Check,
  ChevronDown,
  ChevronUp,
  Clock8,
  HandHelping,
  Home,
  Link,
  Star,
  User,
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
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  user: User,
  home: Home,
};

export type iconNameType = keyof typeof icons;
export default icons;
