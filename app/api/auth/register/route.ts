import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "@/libs/prisma";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, username, password, name } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      return NextResponse.json({
        message: "User already exists with this email id !",
      });
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    console.log({ name, username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Hello" });
}
