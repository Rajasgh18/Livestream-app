import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const getSelf = async () => {
    const self = await currentUser();
    if (!self || !self.username) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id
        }
    })
    if (!user) throw new Error("User not found");

    return user;
}

export const getSelfbyUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            username
        }
    });

    if (!user) throw new Error("User not found");

    if (user.username !== self.username) throw new Error("Unauthorized");

    return user;
}