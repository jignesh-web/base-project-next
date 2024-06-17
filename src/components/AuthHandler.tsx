import { setUserDetails } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { supabase } from "@/service/supabase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
const AuthHandler = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [authState, setAuthState] = useState<boolean>();
  const isSignInOrSignUpPage = ["/signup", "/signin"].includes(router.pathname);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isSignInOrSignUpPage && !!session) {
        router.replace("/");
      } else if (!session) {
        router.replace("./signin");
      }
      dispatch(setUserDetails(session?.user ?? null));
      setAuthState(!!session);
    });

    const res = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUserDetails(session?.user ?? null));
      setAuthState(!!session);
      if (isSignInOrSignUpPage && !!session) {
        router.replace("/");
      } else if (!session) {
        router.replace("./signin");
      }
    });
    const { subscription } = res?.data || {};
    return () => subscription.unsubscribe();
  }, []);
  if (typeof authState === "undefined") return null;
  return children;
};

export { AuthHandler };
