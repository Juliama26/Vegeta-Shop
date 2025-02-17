import { NextRequest } from "next/server";
import Response from "@/libs/api.response";
import { Params } from "next/dist/server/request/params";

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  return Response({
    message: `User detail ID: ${id}`,
    status: 200,
    data: [{ id, name: "Rizky", email: "bT4Vb@example.com" }],
  });
}
