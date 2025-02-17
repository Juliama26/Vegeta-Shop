import Response from "@/libs/api.response";
import { prisma } from "@/libs/prisma";
import { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, params: Params) {
  const productId = await prisma.product.findUnique({
    where: { id: params.params.id },
  });
  return Response({
    message: "Get product by ID",
    status: 200,
    data: productId,
  });
}
