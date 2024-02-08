import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

interface hintProps {
    label: String;
    children: React.ReactNode;
    asChild: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

export const Hint = ({
    label,
    children,
    asChild,
    side,
    align
}: hintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent align={align} side={side} className='text-black bg-white'>
                    <p className='font-semibold'>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};