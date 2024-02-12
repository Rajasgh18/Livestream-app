import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface ShowButtonProps {
    canSee: boolean;
    disabled: boolean;
    setCanSee: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowButton = ({ disabled, canSee, setCanSee }: ShowButtonProps) => {
    const Icon = canSee ? Eye : EyeOff;

    return (
        <div className={cn(
            "bg-[#22242c] rounded-r-md absolute right-0",
            disabled && "cursor-not-allowed"
        )}>
            <Button disabled={disabled} onClick={() => setCanSee(!canSee)} size="sm" variant="ghost">
                <Icon className="h-4 w-4" />
            </Button>
        </div>
    )
}
