import { getSelf } from "./auth-services";
import { db } from "./db";

export const getSearch = async (term?: string) => {
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
                    NOT: {
                        blockedBy: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                },
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnail: true,
                updateAt: true
            },
            orderBy: [
                { isLive: "desc", },
                { updateAt: "desc" },
            ]
        })
    } else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnail: true,
                updateAt: true
            },
            orderBy: [
                { isLive: "desc", },
                { updateAt: "desc" },
            ]
        })
    }

    return streams;
}