"use server";

import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { createTrackedQRcodeURL } from "@/lib/createTrackedQRcodeURL";

interface UpdateQRCodeInput {
  id: string;
  destination_url?: string;
  customization?: {
    qrSize?: number;
    qrLevel?: "L" | "M" | "Q" | "H";
    includeMargin?: boolean;
    foregroundColor?: string;
    backgroundColor?: string;
    qrShape?: "square" | "circle";
    logoUrl?: string | null;
  };
}

export async function updateQRCode({ id, destination_url, customization }: UpdateQRCodeInput) {
  const t = await getTranslations("QR");

  try {
    const existing = await prisma.qRCode.findUnique({ where: { id } });
    if (!existing) {
      throw new Error(t("notFound"));
    }

    const data: any = {};

    if (typeof destination_url === "string") {
      data.destination_url = destination_url;
    }

    if (customization) {
      if (typeof customization.qrSize !== "undefined") data.qrSize = customization.qrSize;
      if (typeof customization.qrLevel !== "undefined") data.qrLevel = customization.qrLevel;
      if (typeof customization.includeMargin !== "undefined") data.includeMargin = customization.includeMargin;
      if (typeof customization.foregroundColor !== "undefined") data.foregroundColor = customization.foregroundColor;
      if (typeof customization.backgroundColor !== "undefined") data.backgroundColor = customization.backgroundColor;
      if (typeof customization.qrShape !== "undefined") data.qrShape = customization.qrShape;
      if (typeof customization.logoUrl !== "undefined") data.logoUrl = customization.logoUrl;
    }

    const updated = await prisma.qRCode.update({ where: { id }, data });
    return { success: true, qr: updated } as const;
  } catch (error) {
    const message = error instanceof Error ? error.message : t("updateError");
    throw new Error(message);
  }
}


