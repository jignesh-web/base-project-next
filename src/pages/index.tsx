import { RootState } from "@/redux/store";
import { PrimaryButton } from "@/components/primary";
import { signOut } from "@/service/supabase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setToast } from "@/redux/slices/toastSlice";
import { useHandleAsync } from "@/hooks";

export default function Home() {
  const user = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch();
  const [handleSignOut, isLoading] = useHandleAsync(signOut);
  const router = useRouter();

  const handleSignOutUser = async () => {
    const res = await handleSignOut();
    if (res?.error === null) {
      router.replace("/signin");
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
        onClick={handleSignOutUser}
      >
        Sign Out
      </PrimaryButton>
    </main>
  );
}
