import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-services";
import { currentUser } from "@clerk/nextjs";

interface CreatorDashboard {
    params: {
        username: string;
    };
}

const CreatorDashboard = async ({ params }: CreatorDashboard) => {
    const externalUser = await currentUser();
    const user = await getUserByUsername(params.username);

    if (!user || user.externalUserId !== externalUser?.id || !user.stream)
        throw new Error("Unauthorized");

    return (
        <div className="h-full">
            <StreamPlayer user={user} stream={user.stream} isFollwing />
        </div>
    );
};

export default CreatorDashboard;