import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
    value: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex gap-x-10 items-center">
                <p className="font-semibold shrink-0">Server Url</p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-4">
                        <Input value={value || ""} placeholder="Server URL" disabled/>
                        <CopyButton value={value || ""}/>
                    </div>
                </div>
            </div>
        </div>
    );
};