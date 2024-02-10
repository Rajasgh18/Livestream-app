import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-services";
import { notFound } from "next/navigation";
import { Actions } from "./_component/actions";

interface UserPageProps {
    params: {
        username: string;
    }
};

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username);
    if (!user) return notFound();

    const isFollowing = await isFollowingUser(user.id);

    return (
        <div className="h-full space-y-4 flex flex-col items-center justify-center">
            <p>Username: {user.username}</p>
            <p>UserId: {user.id}</p>
            <p>Is Following: {`${isFollowing}`}</p>
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    );
};

export default UserPage;