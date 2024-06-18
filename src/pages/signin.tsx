import React from "react";
import { PrimaryInput, PrimaryButton } from "@/components/primary";

import Link from "next/link";
import { ContinueWithGoogle } from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { signInWithEmail } from "@/service/supabase/auth";
import {
  emailValidation,
  passwordValidation,
} from "@/validations/field-validations";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base";
import { useHandleAsync } from "@/hooks";

const SignIn = () => {
  const router = useRouter();

  const [handleSignInWithEmail, isLoading] = useHandleAsync(signInWithEmail);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, watch } = methods || {};

  const handleSignIn = async ({ email, password }: Record<string, string>) => {
    const res = await handleSignInWithEmail({ email, password });

    if (res?.status === 200) {
      router.replace("/");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <Card className=" w-[345px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 w-[350px] space-y-2">
            <PrimaryInput
              registerOptions={emailValidation}
              title="Email"
              type="text"
              name="email"
            />
            <PrimaryInput
              registerOptions={passwordValidation}
              title="Password"
              type="text"
              name="password"
              autoComplete="current-password"
            />
            <PrimaryButton
              loading={isLoading}
              onClick={handleSubmit(handleSignIn)}
            >
              Sign In
            </PrimaryButton>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </p>
            <p className="text-center text-sm"> Or</p>
            <ContinueWithGoogle />
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default SignIn;
