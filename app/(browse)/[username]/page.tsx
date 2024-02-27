import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-services";
import { notFound } from "next/navigation";
import { Actions } from "./_component/actions";
import { isBlocked, isBlockedByUser } from "@/lib/blocking-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    }
};

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username);
    if (!user || !user.stream) notFound();

    const isFollowing = await isFollowingUser(user.id);
    const blocked = await isBlocked(user.id);
    const blockedByUser = await isBlockedByUser(user.id);

    if (blockedByUser) notFound();

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
};

export default UserPage;