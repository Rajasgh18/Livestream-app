import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Clapperboard, LogOut } from "lucide-react";

export const Actions = async () => {
    const user = await currentUser();

    return (
        <div className="flex items-center justify-end gap-x-4 ml-4 lg:ml-0">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                <Link href="/">
                    <LogOut className="w-5 h-5 mr-2" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}