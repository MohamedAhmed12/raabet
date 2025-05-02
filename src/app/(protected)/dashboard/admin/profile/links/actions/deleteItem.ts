'use server';

import { prisma } from '@/lib/prisma';

export async function deleteItem(id: string, linkId: string) {
  try {
    if (!id) throw new Error('Missing ID');

    await prisma.social.delete({
      where: { id },
    });

    // Fetch updated socials
    const updatedSocials = await prisma.social.findMany({
      where: { linkId },
      orderBy: { order: 'asc' },
    });

    return { success: true, socials: updatedSocials };
  } catch (error: any) {
    console.error('error in item Deletion:', error.message || error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
