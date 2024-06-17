import React from "react";
import { PrimaryInput, PrimaryButton } from "@/components/primary";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { signUpWithEmail } from "@/service/supabase/auth";
import {
  emailValidation,
  passwordValidation,
} from "@/validations/field-validations";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods || {};

  const handleSignUp = async ({
    name,
    email,
    password,
    confirmPassword,
  }: Record<string, string>) => {
    const res = await signUpWithEmail({ email, password, otherInfo: { name } });
    if (res?.status === 200) {
      router.replace("/");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-2 w-[345px] space-y-1.5 px-4 py-8 ">
          <h3>Create an account</h3>
          <PrimaryInput
            type="text"
            name="name"
            title="Name"
            registerOptions={{ required: "Name is required" }}
          />
          {/* <PrimaryInput title="Username" /> */}
          <PrimaryInput
            type="text"
            name="email"
            title="Email"
            registerOptions={emailValidation}
          />
          <PrimaryInput
            type="text"
            name="password"
            title="Password"
            registerOptions={passwordValidation}
          />
          <PrimaryInput
            type="text"
            name="confirmPassword"
            title="Confirm Password"
            registerOptions={passwordValidation}
          />
          <PrimaryButton
            loading={isSubmitting}
            onClick={handleSubmit(handleSignUp)}
          >
            Sign Up
          </PrimaryButton>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUp;
