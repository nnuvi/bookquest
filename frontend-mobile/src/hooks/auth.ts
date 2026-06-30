import { useEffect } from "react";
import { getUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // this checks if JWT cookie is valid on backend
        // If cookie is missing this fails
        const user = await getUser();

        // only set user if backend confirms session is valid
        setUser(user);
      } catch (err) {
        // if /me fails, MUST clear stale user
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
};