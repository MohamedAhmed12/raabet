"use client";

type MapBlockEmbedProps = {
  url: string;
  title: string | null;
  blockId: string;
  borderRadius: string | number;
};

export function MapBlockEmbed({
  url,
  title,
  blockId,
  borderRadius,
}: MapBlockEmbedProps) {
  return (
    <div
      className="relative w-full min-h-[140px] rounded-[var(--link-border-radius,8px)] overflow-hidden"
      style={{
        borderRadius,
        minHeight: 140,
      }}
    >
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-block-id={blockId}
      />
      <div
        className="absolute inset-0 bg-black/45 pointer-events-none flex items-center justify-center"
        style={{ borderRadius }}
        aria-hidden
      />
      {title && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-3"
          style={{ borderRadius }}
          aria-hidden
        >
          <span className="text-white font-semibold text-center text-sm sm:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
