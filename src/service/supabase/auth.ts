import { createClient } from "@supabase/supabase-js";
import { handleAsync } from "@/utils/async-handler";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

type EmailAuthProps = {
  email: string;
  password: string;
};

export const signUpWithEmail = handleAsync(
  async ({ email, password }: EmailAuthProps) => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window?.location?.href,
      },
    });
    return { data: res?.data, error: res?.error, msg: "SUCCESS", status: 200 };
  }
);

export const signInWithEmail = handleAsync(
  async ({ email, password }: EmailAuthProps) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data: res?.data, error: res?.error, msg: "SUCCESS", status: 200 };
  }
);

export const signInWithOtp = handleAsync(
  async ({ email }: Omit<EmailAuthProps, "password">) => {
    const res = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window?.location?.href,
      },
    });
    return { data: res?.data, error: res?.error, msg: "SUCCESS", status: 200 };
  }
);

export const signInWithGoogle = handleAsync(async () => {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window?.location?.href,
    },
  });
  return { data: res?.data, error: res?.error, msg: "SUCCESS", status: 200 };
});
