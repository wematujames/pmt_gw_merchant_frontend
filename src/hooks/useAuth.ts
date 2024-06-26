import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                router.push("/auth/login");
            } else {
                setAuthenticated(true);
            }
        }, 3000)
    }, [router]);

    return authenticated;
}
