import { setUserDetails } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { supabase } from "@/service/supabase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const AuthHandler = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUserDetails(session?.user ?? null));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUserDetails(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user?.id && !["/signup", "/signin"].includes(router.pathname)) {
    router.replace("./signin");
  }

  return children;
};

export { AuthHandler };
