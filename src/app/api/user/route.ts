import Response from "@/libs/api.response";

export async function GET() {
  return Response({
    message: "Success",
    status: 200,
    data: [
      { id: 1, name: "Rizky", email: "bT4Vb@example.com" },
      { id: 2, name: "Rizka", email: "bT4Va@example.com" },
      { id: 3, name: "Rizke", email: "bT4Vg@example.com" },
      { id: 4, name: "Rizkf", email: "bT4Vd@example.com" },
    ],
  });
}

export async function POST() {
  return Response({
    message: "New User Created",
    status: 200,
    data: [{ id: 1, name: "Rizky", email: "bT4Vb@example.com" }],
  });
}
