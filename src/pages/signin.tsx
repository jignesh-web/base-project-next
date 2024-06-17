import React from "react";
import { PrimaryInput, PrimaryButton } from "@/components/primary";

import Link from "next/link";
import { ContinueWithGoogle } from "@/components";

export default function Login() {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-2 w-[345px] space-y-2 px-4 py-8 ">
        <h3>Sign In</h3>
        <PrimaryInput title="Email" type="text" name="email" />
        <PrimaryInput
          title="Password"
          type="text"
          name="password"
          autoComplete="current-password"
        />
        <PrimaryButton> Sign In</PrimaryButton>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm"> Or</p>
        <ContinueWithGoogle
          onClick={() => {
            console.log("Continue with google is not available");
          }}
        />
      </div>
    </div>
  );
}
