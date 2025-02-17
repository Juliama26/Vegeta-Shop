import Response from "@/libs/api.response";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const payload = await req.json();

    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: session?.user.id,
        transactionId: {
          equals: null,
        },
      },
    });

    const totalPrice = checkouts.reduce(
      (total, checkout) => total + checkout.pricePerItem * checkout.qty,
      0
    );
    const grandTotalPrice =
      totalPrice +
      payload.aplicationFee +
      payload.asuranceFee +
      payload.deliveryFee;

    const transaction = await prisma.transaction.create({
      data: {
        userId: session?.user.id,
        aplicationFee: payload.aplicationFee,
        asuranceFee: payload.asuranceFee,
        deliveryFee: payload.deliveryFee,
        deliveryType: payload.deliveryType,
        grandTotalPrice: grandTotalPrice,
        totalPrice: totalPrice,
      },
    });

    await prisma.checkout.updateMany({
      where: {
        userId: session?.user.id,
        transactionId: {
          equals: null,
        },
      },
      data: {
        transactionId: transaction.id,
      },
    });

    await prisma.product.updateMany({
      where: {
        id: {
          in: checkouts.map((checkout) => checkout.productId),
        },
      },
      data: {
        itemSold: {
          increment: 1,
        },
      },
    });
    return Response({
      message: "Payment successfully",
      status: 200,
      data: transaction,
    });
  } catch (error: any) {
    return Response({
      message: "Payment Failed",
      status: 500,
      data: error.message,
    });
  }
}
