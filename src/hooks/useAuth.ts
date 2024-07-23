import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(loginUrl: string ) {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                router.push(loginUrl || "/admin/auth/login");
            } else {
                setAuthenticated(true);
            }
        }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return authenticated;
}
