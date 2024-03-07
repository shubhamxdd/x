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

    const user = await prismaClient.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found !" },
        { status: 404 }
      );

    console.log(user);

    const posts = await prismaClient.post.findMany({
      where: {
        id: user.id,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
