'use server';

import prisma from '@/lib/prisma';

export const updateUserAvatar = async (
  userId: string,
  key: string,
  val: string | boolean | number
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        [key]: val,
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Failed to update user field:", error);
    return { success: false};
  }
};
