import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-services";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id }
        });

        if (!otherUser) throw new Error("Not found");
        if (otherUser.id === self.id) return true;
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow;

    } catch (error) {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) throw new Error("Cannot follow yoursef");

    const isFollowing = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });

    if (isFollowing) throw new Error("Already following");

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            follower: true,
            following: true
        }
    });
    return follow;
};

export const unFollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if (!otherUser) throw new Error("User not found!");

    if (otherUser.id === self.id) throw new Error("Cannot unfollow yourself");

    const exisitingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    });

    if (!exisitingFollow) throw new Error("Not following");

    const follow = await db.follow.delete({
        where: { id: exisitingFollow.id },
        include: {
            following: true
        }
    });

    return follow;
};

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        });

        return followedUsers;
    } catch (error) {
        return [];
    }
}