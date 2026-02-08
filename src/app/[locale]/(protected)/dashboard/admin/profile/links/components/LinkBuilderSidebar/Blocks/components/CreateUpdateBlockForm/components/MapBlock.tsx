"use client";

import { DashboardCard } from "@/app/[locale]/(protected)/dashboard/admin/components/DashboardCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Block } from "@prisma/client";
import { useTranslations } from "next-intl";
import { z } from "zod";

const GOOGLE_MAPS_URL = "https://www.google.com/maps";

/** Check if the URL's main domain is a Google Maps domain (e.g. https://www.google.com/maps/). */
function isGoogleMapsDomain(url: string): boolean {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.toLowerCase();
    const path = parsed.pathname.toLowerCase();
    // www.google.com or google.com — must be under /maps
    if (host === "www.google.com" || host === "google.com")
      return path.startsWith("/maps");
    // Short links
    if (host === "maps.app.goo.gl") return true;
    if (host === "goo.gl") return path.startsWith("/maps");
    // Legacy
    if (host === "maps.google.com") return true;
    return false;
  } catch {
    return false;
  }
}

/** Check if a string is a valid Google Maps URL we can embed (main domain must be Google Maps). */
function isGoogleMapsEmbeddableUrl(url: string): boolean {
  const u = url.trim();
  if (!u) return false;
  if (u.includes("<") || u.includes(">")) return false; // reject raw HTML
  return isGoogleMapsDomain(u);
}

/** Extract the first iframe src that looks like a Google Maps URL from pasted HTML. */
function extractEmbedUrlFromPaste(value: string): string | null {
  const srcMatch = value.match(/<iframe[^>]*\ssrc\s*=\s*["']([^"']+)["']/i);
  if (!srcMatch) return null;
  const src = srcMatch[1].trim().replace(/&amp;/gi, "&");
  return isGoogleMapsEmbeddableUrl(src) ? src : null;
}

/** Normalize input: if it's embeddable as-is return it; if it's HTML with an embed iframe return the src; otherwise return null. */
function normalizeMapUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const extracted = extractEmbedUrlFromPaste(trimmed);
  if (extracted) return extracted;
  return isGoogleMapsEmbeddableUrl(trimmed) ? trimmed : null;
}

const googleMapsLink = (chunks: React.ReactNode) => (
  <a
    href={GOOGLE_MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="text-dashboard-primary underline underline-offset-2 hover:opacity-80"
  >
    {chunks}
  </a>
);

export const MapBlock = ({
  block,
  errors,
  onUpdateBlockProperty,
}: {
  block: Block;
  errors: z.ZodIssue[];
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const t = useTranslations("LinksPage.generalStyles.blockForm.mapBlock");

  const titleError = errors?.find((e) => e.path?.includes("title"));
  const urlError = errors?.find((e) => e.path?.includes("url"));

  return (
    <div className="flex flex-col p-[22px] gap-4 pb-8 flex-1">
      <DashboardCard title={t("titleLabel")} className="gap-2">
        <Label className="text-sm">{t("locationTitle")}</Label>
        <Input
          placeholder={t("locationTitlePlaceholder")}
          value={block.title || ""}
          onChange={(e) => onUpdateBlockProperty("title", e.target.value)}
          className="w-full"
        />
        {titleError && (
          <p className="text-red-500 text-sm">{t("titleRequired")}</p>
        )}
      </DashboardCard>

      <DashboardCard title={t("locationUrlLabel")} className="gap-2">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">{t("googleMapsUrl")}</Label>
          <Input
            placeholder={t("googleMapsUrlPlaceholder")}
            value={block.url || ""}
            onChange={(e) => {
              const value = e.target.value;
              const urlOnly = normalizeMapUrl(value);
              onUpdateBlockProperty("url", urlOnly !== null ? urlOnly : value);
            }}
            className="w-full"
            type="url"
          />
          {urlError && (
            <p className="text-red-500 text-sm">{t("urlRequired")}</p>
          )}
          <p className="text-[.82rem] text-deep-blue-gray mt-3">{t("urlHint")}</p>
          <div className="rounded-md border border-border/60 bg-muted/30 p-3 mt-1">
            <p className="text-[.85rem] font-medium text-foreground mb-2">
              {t("howToEmbedTitle")}
            </p>
            <ol className="text-[.85rem] text-muted-foreground space-y-1.5 list-decimal list-inside">
              <li>{t.rich("howToEmbedStep1", { link: googleMapsLink })}</li>
              <li>{t("howToEmbedStep2")}</li>
              <li>{t("howToEmbedStep3")}</li>
              <li>{t("howToEmbedStep4")}</li>
            </ol>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};
