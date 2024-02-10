import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-services";
import { notFound } from "next/navigation";
import { Actions } from "./_component/actions";
import { isBlocked, isBlockedByUser } from "@/lib/blocking-service";

interface UserPageProps {
    params: {
        username: string;
    }
};

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username);
    if (!user) return notFound();

    const isFollowing = await isFollowingUser(user.id);
    const blocked = await isBlocked(user.id);
    const blockedByUser = await isBlockedByUser(user.id);

    if (blockedByUser) return notFound();

    return (
        <div className="h-full space-y-4 flex flex-col items-center justify-center">
            <p>Username: {user.username}</p>
            <p>UserId: {user.id}</p>
            <p>Is Following: {`${isFollowing}`}</p>
            <Actions isFollowing={isFollowing} isBlocked={blocked} userId={user.id} />
        </div>
    );
};

export default UserPage;