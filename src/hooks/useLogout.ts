import { logoutUser as merchantLogout } from "@/app/merchant/actions/auth";
import { logoutUser } from "@/app/nerasol/actions/auth";
import { useRouter } from "next/navigation";

export function useLogout(type: string) {
    const router = useRouter();

    const logout = async () => {
        try {
            if (type === "merchant"){
                await merchantLogout()
            }

            if (type === "nerasol"){
                await logoutUser()
            }
        } catch (err) {
            
        } finally {
            localStorage.removeItem(`${type}-token`);
            router.push(`/auth/login?tab=${type}`);
        }
    };

    return logout;
}
