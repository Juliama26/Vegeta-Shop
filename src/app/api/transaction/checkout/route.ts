import Response from "@/libs/api.response";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const payload = await req.json();
    const product = await prisma.product.findFirst({
      where: { id: payload.productId },
    });

    if (!product) {
      return Response({
        message: "Product not found",
        status: 404,
      });
    }

    const checkout = await prisma.checkout.create({
      data: {
        productId: product.id,
        userId: session?.user.id,
        qty: payload.qty,
        pricePerItem: product.price,
      },
    });

    return Response({
      message: "Checkout product successfully",
      status: 200,
      data: checkout,
    });
  } catch (error) {
    return Response({
      message: "Checkout product failed",
      status: 500,
      data: error,
    });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: session?.user.id,
        transactionId: null,
      },
      include: { product: true },
    });
    return Response({
      message: "Checkout item successfully",
      status: 200,
      data: checkouts,
    });
  } catch (error) {
    return Response({
      message: "Checkout product failed",
      status: 500,
      data: error,
    });
  }
}
