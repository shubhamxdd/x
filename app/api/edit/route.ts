import prismaClient from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession();

    const currentUser = await prismaClient.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    const { name, username, bio, profileImage, coverImage } =
      await request.json();

    if (!name || !username) throw new Error("Missing fields!!");

    const updatedUser = await prismaClient.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    // console.log("from edit api route", { session });
    //    return NextResponse.json({ currentUser, updatedUser });
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error in edit route" }, { status: 500 });
  }
}
