"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    asChild?: boolean;
    children?: React.ReactNode;
    mode?: "modal" | "redirect";
};


export const LoginButton = ({ asChild, children, mode = "redirect" }: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    };

    if(mode === "modal") {
        return (
            <span>
                Todod implement modal
            </span>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}