import { NextResponse } from "next/server";

interface APIResponse {
  message?: string;
  data?: unknown;
  status?: ResponseInit["status"];
}

const Response = ({ message = "Success", data, status = 200 }: APIResponse) =>
  NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );

export default Response;
