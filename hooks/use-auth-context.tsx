import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type AuthData = {
  claims?: Record<string, any> | null;
  profile?: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  session: Session | null;
};

export const AuthContext = createContext<AuthData>({
  claims: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
  session: null,
});

export const useAuthContext = () => useContext(AuthContext);
