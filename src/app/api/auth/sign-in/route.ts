import Response from "@/libs/api.response";
import { prisma } from "@/libs/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || !bcrypt.compareSync(payload.password, user.password))
      return Response({
        status: 404,
        message: "Invalid email or password",
      });

    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      status: 200,
      message: "Sign In Successfully",
      data,
    });
  } catch (error: unknown) {
    return Response({
      status: 500,
      message: "Sign In Failed",
      data: error,
    });
  }
}
