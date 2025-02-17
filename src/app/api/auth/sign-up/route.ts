import Response from "@/libs/api.response";
import { Prisma, User } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const data: Prisma.UserCreateInput = {
      name: payload.name,
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 10),
    };

    const user = await prisma.user.create({ data });

    const dataRes: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      message: "New User Created",
      status: 200,
      data: dataRes,
    });
  } catch (error: any) {
    return Response({
      message: "Sign Up Failed",
      status: 500,
      data: error?.message,
    });
  }
}
