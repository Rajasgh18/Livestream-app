"use server";

import { getSelf } from "@/lib/auth-services";
import { blockUser, unblockUser } from "@/lib/blocking-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    const self = await getSelf();

    let blockedUser;
    try {
        blockedUser = await blockUser(id);

    } catch (error) {
        // This means user is a guest
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch (error) {
        // This means user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
};

export const onUnBlock = async (id: string) => {
    const unBlockedUser = await unblockUser(id);

    revalidatePath('/');

    if (unBlockedUser) revalidatePath(`/${unBlockedUser.blocked.username}`)

    return unBlockedUser;
};