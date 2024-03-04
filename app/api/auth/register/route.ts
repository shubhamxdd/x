import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismaClient from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { email, username, password, name, confirmPassword } =
      await request.json();

    if (!email || !username || !password || !name || !confirmPassword) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password and Confirm Password do not match" },
        { status: 400 }
      );
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

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
