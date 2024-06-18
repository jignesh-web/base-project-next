import { setUserDetails } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/service/supabase/client";

const AuthHandler = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState<boolean>();

  const isSignInOrSignUpPage = ["/signup", "/signin"].includes(router.pathname);

  const handleSetSession = (session: Session | null) => {
    if (isSignInOrSignUpPage && !!session) {
      router.replace("/");
    } else if (!isSignInOrSignUpPage && !session) {
      router.replace("./signin");
    }
    dispatch(setUserDetails(session?.user ?? null));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetSession(session);
      setAuthState(!!session);
    });

    // listen for auth state changes
    const res = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetSession(session);
      setAuthState(!!session);
    });
    const { subscription } = res?.data || {};
    return () => subscription.unsubscribe();
  }, []);

  // TODO: add a loading screen if authState is undefined
  if (typeof authState === "undefined") return null;

  return children;
};

export { AuthHandler };
