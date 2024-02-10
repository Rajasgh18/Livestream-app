"use client";
import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    isBlocked: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, isBlocked, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then(data => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong!"));
        })
    };
    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then(data => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong!"));
        })
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then(data => toast.success(`You have blocked ${data.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong!"));
        })
    };
    const handleUnBlock = () => {
        startTransition(() => {
            onUnBlock(userId)
                .then(data => toast.success(`You have unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong!"));
        })
    };

    const handleFollowClick = () => {
        if (isFollowing)
            handleUnFollow();
        else
            handleFollow();
    };

    const handleBlockClick = () => {
        if (isBlocked)
            handleUnBlock();
        else
            handleBlock();
    };

    return (
        <div className="flex space-x-4">
            <Button variant="primary" disabled={isPending} onClick={handleFollowClick}>
                {isFollowing ? "unfollow" : "follow"}
            </Button>
            <Button disabled={isPending} onClick={handleBlockClick}>
                {isBlocked ? "unblock" : "block"}
            </Button>
        </div>
    );
};