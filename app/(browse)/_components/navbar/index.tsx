import { Actions } from "./Actions";
import { Logo } from "./Logo";
import { Search } from "./Search";

export const Navbar = () => {
    return (
        <nav className="h-16 w-full top-0 fixed z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <Search />
            <Actions/>
        </nav>
    )
}