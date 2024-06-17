import { createClient } from "@supabase/supabase-js";
import { handleAsync } from "@/utils";
import { CustomError } from "@/utils/common.utils";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      detectSessionInUrl: true, // detect session in url (for Oauth redirects)
      // storage: , //custom configuration for storage
    },
  }
);

type EmailAuthArgs = {
  email: string;
  password: string;
  otherInfo?: object;
};

const formatResponse = (res: any, successMessage?: string) => {
  return {
    data: res?.data,
    error: res?.error,
    status: res?.status || 200,
    message: res?.error?.message || successMessage,
  };
};

export const signUpWithEmail = handleAsync(
  async ({ email, password, otherInfo }: EmailAuthArgs) => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window?.location?.href,
        data: otherInfo,
      },
    });
    return formatResponse(res);
  }
);

export const signInWithEmail = handleAsync(
  async ({ email, password }: Omit<EmailAuthArgs, "otherInfo">) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return formatResponse(res);
  }
);

export const signInWithOtp = handleAsync(
  async ({ email, otherInfo }: Omit<EmailAuthArgs, "password">) => {
    const res = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window?.location?.href,
        data: otherInfo,
      },
    });
    return formatResponse(res);
  }
);

export const signInWithGoogle = handleAsync(async () => {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window?.location?.href,
    },
  });
  return formatResponse(res);
});

export const signOut = handleAsync(async () => {
  const res = await supabase.auth.signOut();
  return formatResponse(res);
});
