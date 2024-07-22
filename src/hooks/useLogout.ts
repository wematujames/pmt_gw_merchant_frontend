import { logoutUser } from "@/app/nerasol/actions/auth";
import { useRouter } from "next/navigation";

export function useLogout(loginUrl?: string) {
    const router = useRouter();

    const logout = async () => {
        try {
            await logoutUser()
        } catch (err) {
            
        } finally {
            localStorage.removeItem("token");
            router.push(loginUrl || "/nerasol/auth/login");
        }
    };

    return logout;
}
