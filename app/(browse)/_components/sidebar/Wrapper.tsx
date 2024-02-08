"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"


interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);


    return (
        <aside className={cn(
            "fixed left-0 w-60 h-full bg-background flex flex-col border-r border-[#2D2E35] z-50 transition-all duration-200",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}