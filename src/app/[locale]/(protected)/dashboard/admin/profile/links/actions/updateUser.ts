"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";

export const updateUser = async (
  where: any,
  data: Record<string, string | boolean | number>
) => {
  try {
    // we have to use updateMany as update require to pass the ID and sometimes we don't have it
    const updatedUser = await prisma.user.updateMany({
      where,
      data,
    });

    return updatedUser;
  } catch (error) {
    const err = `Failed to update user field:${error}`;
    logError(err, {
      action: "updateUser",
      errorType: "ValidationError",
    });
    return error;
  }
};
