import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo = () => {
    return (
        <div>
            <div className="bg-white p-1 rounded-full">
                <Image src="./spooky.svg" height={80} width={80} alt="Gamehub" />
            </div>
            <div className={cn("flex text-white flex-col items-center space-y-2", font.className)}>
                <p className="text-xl font-semibold">Gamehub</p>
                <p className="text-sm text-muted-foreground">Let&apos;s Play</p>
            </div>
        </div>
    )
};