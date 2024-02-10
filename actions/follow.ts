"use server";

import { getSelf } from "@/lib/auth-services";
import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (userId: string) => {
    try {
        const followedUser = await followUser(userId);
        revalidatePath('/');

        if (followedUser) revalidatePath(`/${followedUser.following.username}`)

        return followedUser;
    } catch (error) {
        throw new Error("Internal Error");
    }
};

export const onUnFollow = async (userId: string) => {
    try {
        const unFollowedUser = await unFollowUser(userId);

        revalidatePath('/');

        if (unFollowedUser) revalidatePath(`/${unFollowedUser.following.username}`)

        return unFollowedUser;
    } catch (error) {
        throw new Error("Internal Error");
    }
};