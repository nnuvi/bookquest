import { useEffect } from "react";
import { getUser, login, logout, signup } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFeedback } from "./useFeedbackModal";
import { getErrorMessage } from "@/lib/app";
import { router } from "expo-router";

// export const useAuth = () => {
//   const setUser = useAuthStore((s) => s.setUser);
//   const logout = useAuthStore((s) => s.logout);
//   const setLoading = useAuthStore((s) => s.setLoading);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         // this checks if JWT cookie is valid on backend
//         // If cookie is missing this fails
//         const user = await getUser();

//         // only set user if backend confirms session is valid
//         setUser(user);
//       } catch (err) {
//         // if /me fails, MUST clear stale user
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);
// };

export function useAuthUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAuth() {
  const { setUser, logout, setLoading } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
    retry: false,
  });

  useEffect(() => {
    setLoading(isLoading);

    if (data) {
      setUser(data);
    }

    if (isError) {
      logout();
    }
  }, [data, isLoading, isError]);
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: login,

    onSuccess: async () => {
      // Cookie has now been set by the backend.
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },

    onError: (err: any) => {
      error(err);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: signup,

    onSuccess: async () => {
      // Cookie has now been set by the backend.
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      success("Account created successfully.");
    },

    onError: (err: any) => {
      error(err);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout: clearAuth } = useAuthStore();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      clearAuth();

      // Remove cached authenticated user
      queryClient.removeQueries({
        queryKey: ["me"],
      });

      success("Logged out successfully");

      router.replace("/(auth)/landing");
    },

    onError: (err) => {
      error(err);
    },
  });
}
