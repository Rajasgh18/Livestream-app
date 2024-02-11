import { getSelfbyUsername } from "@/lib/auth-services";
import { Navbar } from "./_component/navbar";
import { redirect } from "next/navigation";
import { Sidebar } from "./_component/sidebar";
import { Container } from "./_component/container";

interface CreatorLayoutProps {
    params: {
        username: string;
    };
    children: React.ReactNode;
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
    try {
        const self = await getSelfbyUsername(params.username);
    } catch (error) {
        redirect("/");
    }
    return (
        <>
            <Navbar />
            <div className="flex pt-16">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

export default CreatorLayout;