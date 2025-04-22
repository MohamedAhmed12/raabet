// /app/api/social/order/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Received data11111:', data); // Log the incoming data

    const updatePromises = data.map((item: { id: string; order: number }) =>
      prisma.social.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );

    await Promise.all(updatePromises);

    console.log('Order updated successfully22222222');
    return NextResponse.json({ message: 'Order updated' });
  } catch (error) {
    console.error('Error updating order3333333333333:', error); // Log any errors
    return NextResponse.json({ message: 'Failed to update order', error: error.message }, { status: 500 });
  }
}
