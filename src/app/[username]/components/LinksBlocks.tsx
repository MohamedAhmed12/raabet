import { useLinkStore } from "@/app/store/use-link-store";
import { cn } from "@/lib/cn";

export default function LinksBlocks() {
  const link = useLinkStore((state) => state.link);

  return (
    link?.blocks && (
      <div className="block-icons-container flex flex-col mt-[31px] justify-center items-center flex-wrap font-noto-sans">
        {link?.blocks.map((block) => (
          <a
            key={block.id}
            className={cn(
              "flex flex-col items-center justify-center w-full py-[16.5px] px-[13.75px] cursor-pointer mb-2.5 bg-[#d5cfd8]"
            )}
            style={{
              color: link?.card_styles_text_color,
              borderRadius: link?.card_styles_card_corner * 28,
            }}
            target="_blank"
          >
            <div
              className={cn(
                "text-md font-medium leading-[1.3em] mb-1.5",
                link?.title_font
              )}
            >
              {block.title}
            </div>
            <div className={`${link?.text_font} text-[12.6px] leading-[1.3em]`}>
              {block.text}
            </div>
          </a>
        ))}
      </div>
    )
  );
}
