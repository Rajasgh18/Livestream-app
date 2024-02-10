"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";


interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);

    const isClient = useIsClient();

    if (!isClient) return (
        <aside className={cn(
            "fixed left-0 w-[70px] lg:w-60 h-full bg-background flex flex-col border-r border-[#2D2E35] z-50 transition-all duration-200",
        )}>
            <ToggleSkeleton />
            <div className="space-y-4 pt-4 lg:pt-0">
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </div>
        </aside>
    );

    return (
        <aside className={cn(
            "fixed left-0 w-60 h-full bg-background flex flex-col border-r border-[#2D2E35] z-50 transition-all duration-200",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}