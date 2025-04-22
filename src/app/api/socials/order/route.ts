import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const updatePromises = data.map((item: { id: string; order: number }) =>
      prisma.social.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Order updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update order', error: error.message }, { status: 500 });
  }
}
