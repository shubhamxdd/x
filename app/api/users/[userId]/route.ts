import prismaClient from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const findUser = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const followersCount = await prismaClient.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...findUser, followersCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ERROR from users/[userId] route" });
  }
}
