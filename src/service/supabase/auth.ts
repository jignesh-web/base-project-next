import { Response } from "../index.types";
import { supabase } from "./client";

type EmailAuthArgs = {
  email: string;
  password: string;
  otherInfo?: object;
};

const formatResponse = <T>(
  { data, error }: Partial<Response<T>>,
  successMessage?: string
) => {
  return {
    data: data,
    error: error,
    status: error?.status || 200,
    message: error?.message || successMessage,
  };
};

export const signUpWithEmail = async ({
  email,
  password,
  otherInfo,
}: EmailAuthArgs) => {
  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window?.location?.href,
      data: otherInfo,
    },
  });
  return formatResponse(res);
};

export const signInWithEmail = async ({
  email,
  password,
}: Omit<EmailAuthArgs, "otherInfo">) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return formatResponse({ data, error });
};

export const signInWithOtp = async ({
  email,
  otherInfo,
}: Omit<EmailAuthArgs, "password">) => {
  const res = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window?.location?.href,
      data: otherInfo,
    },
  });
  return formatResponse(res);
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window?.location?.href,
    },
  });
  return formatResponse({ data, error });
};

export const signOut = async () => {
  const res = await supabase.auth.signOut();
  return formatResponse(res);
};
