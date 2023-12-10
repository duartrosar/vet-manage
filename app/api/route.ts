import { NextResponse } from "next/server";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("GET API", session);

  return NextResponse.json({ authenticated: !!session });
}
