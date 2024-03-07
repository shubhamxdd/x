import prismaClient from "@/libs/prisma";
import { getServerSession } from "next-auth";
import EditModal from "./EditModal";

const EditModalServer = async () => {
  const session = await getServerSession();
  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  return (
    <>
      {/* TODO */}
      {/* @ts-ignore */}
      <EditModal user={user} />
    </>
  );
};

export default EditModalServer;
