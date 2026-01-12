import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { logoutRequest } from "@/lib/client/auth";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutRequest();
      logout();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLogout };
}
