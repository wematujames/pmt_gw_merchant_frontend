import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import setAuthTokenHeader from "@/actions/utils/setAuthToken";

export function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                router.push("/auth/login");
            } else {
                setAuthTokenHeader()
                setAuthenticated(true);
            }
        }, 3000)
    }, [router]);

    return authenticated;
}
