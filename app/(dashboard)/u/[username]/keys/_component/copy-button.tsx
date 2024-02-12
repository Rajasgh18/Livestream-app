"use client";

import { Button } from "@/components/ui/button";
import { Check, CheckCheck, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value?: string;
};

export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const Icon = isCopied ? CheckCheck : Copy;

    return (
        <Button onClick={onCopy} disabled={!value || isCopied} size="sm"><Icon className="w-4 h-4"/></Button>
    )
}
