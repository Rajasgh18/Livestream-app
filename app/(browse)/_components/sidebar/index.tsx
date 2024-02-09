import { getRecommended } from "@/lib/recommended-services"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = async () => {
    const recommended = await getRecommended();
    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    );
};

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 w-[70px] lg:w-60 h-full bg-background flex flex-col border-r border-[#2D2E35] z-50 transition-all duration-200">
            <ToggleSkeleton />
            <div className="space-y-4 pt-4 lg:pt-0">
                <RecommendedSkeleton />
            </div>
        </aside>
    );
};