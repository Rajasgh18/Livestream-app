"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowingProps {
    data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar(state => state);

    if (data.length === 0) return null;

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map(follower => (
                    <UserItem key={follower.following.id} username={follower.following.username} imageUrl={follower.following.imageUrl} isLive={false} />
                ))}
            </ul>
        </div>
    );
};

export const FollowingSkeleton = () => {
    const { collapsed } = useSidebar(state => state);

    return (
        <div>
            {!collapsed && <Skeleton className="ml-6 h-5 mb-2 hidden lg:block w-[100px]" />}
            <ul className="px-2 pt-2 lg:pt-0">
                {[...Array(3)].map((_, i) => (
                    <UserItemSkeleton key={i} />
                ))}
            </ul>
        </div>
    );
};