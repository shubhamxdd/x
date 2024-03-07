import prismaClient from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// To fetch posts created by a user ie from user id
export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email)
      return NextResponse.json(
        { message: "User not found !" },
        { status: 404 }
      );

    const posts = await prismaClient.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log({ posts, userId });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
