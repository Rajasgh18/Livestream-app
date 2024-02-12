"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Eye } from "lucide-react";
import { ShowButton } from "./show-button";
import { useState } from "react";

interface KeyCardProps {
    value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
    const [canSee, setCanSee] = useState(false);
    return (
        <div className="p-6 rounded-xl bg-muted flex items-center gap-x-10">
            <p className="font-semibold shrink-0">Stream Key</p>
            <div className="space-y-2 w-full">
                <div className="w-full flex items-center gap-x-4">
                    <div className="w-full flex items-center relative">
                        <Input value={value || ""} type={canSee ? "text" : "password"} placeholder="Stream Key" disabled />
                        <ShowButton disabled={!value} canSee={canSee} setCanSee={setCanSee} />
                    </div>
                    <CopyButton value={value || ""} />
                </div>
            </div>
        </div>
    );
};
