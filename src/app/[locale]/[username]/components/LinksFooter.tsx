import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { getFontClassClient } from "@/lib/fonts";

export default function LinksFooter() {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div className="flex w-full items-center justify-center text-[#6B5B71] font-bold h-[70px]">
      <a
        className={cn("flex flex-col space-2 items-center w-max", fontClass)}
        href="https://rabetlink.com"
        data-google-action="click"
        data-google-category="footer-logo-click"
        data-google-label="mohamedgad-67d5ae9419c8bbb508c06d13"
        target="_blank"
      >
        <span className="uppercase text-[.75em] opacity-50 leading-none tracking-[0.5]">
          Made with
        </span>

        <span className="text-[1em] font-bold">rabetlink.com</span>
      </a>
    </div>
  );
}
