import { getServerSession } from "next-auth";
import UserComponent from "./UserPage";
import prismaClient from "@/libs/prisma";

const UserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const currUser = await getServerSession();

  const currentUser = await prismaClient.user.findUnique({
    where: {
      email: currUser?.user?.email || "",
    },
  });

  // console.log("FROM USERID PAGE",{currentUser})

  return (
    <>
      <UserComponent userId={userId} currentUser={currentUser || null} />
    </>
  );
};

export default UserPage;
