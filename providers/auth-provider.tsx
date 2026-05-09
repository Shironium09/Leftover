import { AuthContext } from "../hooks/use-auth-context";
import { supabase } from "../lib/supabase";
import { PropsWithChildren, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the initial session
    const fetchSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log("Auth state changed:", _event);
      setSession(newSession);

      if (_event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch profile whenever session changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setProfile(data);
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        claims: session?.user?.user_metadata ?? null,
        isLoading,
        profile,
        isLoggedIn: !!session,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
