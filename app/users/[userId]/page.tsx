import UserComponent from "./UserPage";

const UserPage = ({ params: { userId } }: { params: { userId: string } }) => {
  return (
    <>
      <UserComponent userId={userId} />
    </>
  );
};

export default UserPage;
