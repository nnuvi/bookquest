import { PropsWithChildren } from "react";
import { useAuth } from "@/hooks/auth";

export default function AuthProvider({ children }: PropsWithChildren) {
  useAuth();

  return <>{children}</>;
}
