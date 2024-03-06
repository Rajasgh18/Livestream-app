import { db } from "./db";
import { getSelf } from "./auth-services";

export const getStreams = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        userId = null;
    }

    let streams = [];

    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    blocking: {
                        some: {
                            blockedId: userId
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnail: true
            },
            orderBy: [
                { isLive: "desc" },
                { updateAt: "desc" }
            ]
        })
    } else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnail: true
            },
            orderBy: [
                { isLive: "desc" },
                { updateAt: "desc" }
            ]
        })
    }
    return streams;
};