import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-services";

export const getRecommended = async () => {
    const self = await getSelf();

    let users = [];
    if (self.id) {
        users = await db.user.findMany({
            where: {
                NOT: { id: self.id }
            }
        })
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    return users;
}