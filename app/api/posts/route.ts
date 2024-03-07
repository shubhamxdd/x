import prismaClient from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    const { body } = await request.json();

    const post = await prismaClient.post.create({
      data: {
        body,
        userId: user?.id!,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong !" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const posts = await prismaClient.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("All posts", posts);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
