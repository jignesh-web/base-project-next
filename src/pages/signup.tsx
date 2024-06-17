import React from "react";
import { PrimaryInput, PrimaryButton } from "@/components/primary";

import Link from "next/link";

const SignUp = () => {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-2 w-[345px] space-y-1.5 px-4 py-8 ">
        <h3>Create an account</h3>
        <PrimaryInput title="Name" />
        {/* <PrimaryInput title="Username" /> */}
        <PrimaryInput title="Email" />
        <PrimaryInput title="Password" />
        <PrimaryInput title="Confirm Password" />
        <PrimaryButton>Sign Up</PrimaryButton>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
