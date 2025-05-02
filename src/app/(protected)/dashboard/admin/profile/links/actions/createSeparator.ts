'use server';

import { prisma } from '@/lib/prisma';

export async function createSeparator(linkId: string) {
  try {
    if (!linkId) throw new Error('Missing link ID');

    const maxOrder = await prisma.social.aggregate({
      where: { linkId },
      _max: { order: true },
    });

    const newOrder = (maxOrder._max.order ?? 0) + 1;

    await prisma.social.create({
      data: {
        linkId,
        icon: '',
        url: '',
        order: newOrder,
        label: '',
      },
    });

    // Fetch updated socials
    const updatedSocials = await prisma.social.findMany({
      where: { linkId },
      orderBy: { order: 'asc' },
    });

    return { success: true, socials: updatedSocials };
  } catch (error: any) {
    console.error('createSeparator error:', error.message || error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
