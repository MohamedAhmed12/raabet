import { useLinkStore } from "@/app/store/use-link-store";

export default function LinksBlocks() {
  const blocks = useLinkStore((state) => state.link.blocks);

  return (
    blocks && (
      <div className="block-icons-container flex mt-[31px] justify-center items-center flex-wrap">
        {blocks.map((block) => (
          <p>block</p>
        ))}
      </div>
    )
  );
}
