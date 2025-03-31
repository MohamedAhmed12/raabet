import { Icon } from "@/components/Icon";

export default function LinksFooter() {
  return (
    <div className="flex w-full items-center justify-center text-[#6B5B71] font-bold h-[100px]">
      <a
        className="flex flex-col space-2 items-center font-noto-sans w-max"
        href="https://liinks.co/?utm_source=liinks_footer&amp;utm_campaign=mohamedgad"
        data-google-action="click"
        data-google-category="footer-logo-click"
        data-google-label="mohamedgad-67d5ae9419c8bbb508c06d13"
        target="_blank"
      >
        <span className="uppercase text-[.75em] opacity-50 leading-none tracking-[0.5]">
          Made with
        </span>

        <span className="text-[1em] font-bold">Raabet.io</span>
      </a>
    </div>
  );
}
