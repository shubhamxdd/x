import prismaClient from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prismaClient.user.findMany({
      orderBy: {
        creaatedAt: "desc",
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ERROR from users route" });
  }

  return NextResponse.json({ mesage: "GET /users" });
}
