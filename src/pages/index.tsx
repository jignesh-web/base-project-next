import { RootState } from "@/redux/store";
import { PrimaryButton } from "@/components/primary";
import { signOut } from "@/service/supabase/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useHandleAsync } from "@/hooks";

export default function Home() {
  const user = useSelector((state: RootState) => state?.user);

  const [handleSignOut, isLoading] = useHandleAsync(signOut, {
    errorMessage: "Failed to sign out",
    successMessage: "Successfully signed out",
    onSuccess: (data) => {
      if (!data?.error) {
        router.replace("/signin");
      }
    },
  });

  const router = useRouter();

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
