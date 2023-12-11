import { NextResponse } from "next/server";
import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession(options);
  console.log("GET API", session);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  return NextResponse.json({ authenticated: !!session });
}
