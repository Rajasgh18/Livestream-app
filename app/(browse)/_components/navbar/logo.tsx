import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center hover:opacity-75 gap-x-4 transition">
                <div className="bg-white rounded-full p-1 h-10 w-10 shrink-0 lg:shrink">
                    <Image src="/spooky.svg" alt="Gamehub" height={32} width={32} />
                </div>
                <div className={cn(
                    "hidden lg:block",
                    font.className
                    )}>
                    <p className="text-lg font-semibold">Gamehub</p>
                    <p className="text-xs text-muted-foreground">Let&apos;s play</p>
                </div>
            </div>
        </Link>
    );
};