"use server";

import {iconNameType} from "@/assets/icons";
import {prisma} from "@/lib/prisma";

export async function createSocial({
  linkId,
  icon,
}: {
  linkId: string;
  icon: iconNameType;
}) {
  try {
    const lastItem = await prisma.social.findFirst({
      where: {linkId},
      orderBy: {order: "desc"},
    });

    const order = lastItem ? lastItem.order + 1 : 0;
    await prisma.social.create({
      data: {
        linkId,
        icon,
        label: "",
        url: "",
        order,
      },
    });

    const socials = await prisma.social.findMany({
      where: {linkId},
      orderBy: {order: "asc"},
    });

    return {success: true, socials};
  } catch (error) {
    console.error(error);
    return {success: false, error: "Database error"};
  }
}
