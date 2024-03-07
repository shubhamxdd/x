import prismaClient from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// to fetch a single post with post id
export async function GET(
  request: Request,
  { params: { postId } }: { params: { postId: string } }
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

    const post = await prismaClient.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post)
      return NextResponse.json(
        { message: "Post not found !" },
        { status: 404 }
      );

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
