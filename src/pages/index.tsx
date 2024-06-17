import Image from "next/image";
import { Inter } from "next/font/google";
import { RootState } from "@/redux/store";
import { PrimaryButton } from "@/components/primary";
import { signOut } from "@/service/supabase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { setToast } from "@/redux/slices/toastSlice";

export default function Home() {
  const user = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    const res = await signOut();

    if (res?.error === null) {
      router.replace("/signin");
    } else {
      setIsLoading(false);
    }

    const type = res?.error ? "ERROR" : "SUCCESS";
    const message = res?.error?.message || "Successfully signed out";
    dispatch(setToast({ type, message }));
  };

  return (
    <main className={` flex min-h-screen flex-col items-center p-24 gap-12`}>
      <p>
        Hey there, <span className="font-bold">{user?.email}👋</span>
      </p>
      <PrimaryButton
        className=" w-24"
        loading={isLoading}
        onClick={handleSignOut}
      >
        Sign Out
      </PrimaryButton>
    </main>
  );
}
