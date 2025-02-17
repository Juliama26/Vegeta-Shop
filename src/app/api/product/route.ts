import Response from "@/libs/api.response";
import { prisma } from "@/libs/prisma";
import { ProductCategory } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const take = 9;
    const query = req.nextUrl.searchParams;
    const page = query.get("page")
      ? parseInt(query.get("page") as string) - 1
      : 0;

    const categories = query.get("category")?.split(",") || undefined;
    const queryCondition = {
      AND: {
        category: {
          in: categories as ProductCategory[],
        },
      },
    };

    const skip = page * take;
    const totalProducts = await prisma.product.count({});
    const product = await prisma.product.findMany({
      take,
      skip,
      where: queryCondition,
    });

    return Response({
      message: "Get all products successfully",
      status: 200,
      data: {
        total: totalProducts,
        data: product,
      },
    });
  } catch (error: unknown) {
    return Response({
      status: 500,
      message: "Failed to get products",
      data: error,
    });
  }
}
