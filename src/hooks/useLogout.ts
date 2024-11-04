import { logoutUser as merchantLogout } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function useLogout(type: string) {
    const router = useRouter();

    const logout = async () => {
        try {
            await merchantLogout()
        } catch (err) {
            
        } finally {
            localStorage.removeItem(`token`);
            router.push(`/auth/login`);
        }
    };

    return logout;
}
