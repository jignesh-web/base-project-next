import { GoogleIcon } from "@/icons/GoogleIcon";
import React from "react";
import { useHandleAsync } from "@/hooks";
import { signInWithGoogle } from "@/service/supabase/auth";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/toastSlice";

// Ref: https://developers.google.com/identity/branding-guidelines
export const ContinueWithGoogle = () => {
  const [handleSignInWithGoogle] = useHandleAsync(signInWithGoogle);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const res = await handleSignInWithGoogle();
    if (res?.error) {
      dispatch(setToast({ type: "ERROR", message: "Failed to sign in!" }));
    }
  };

  return (
    <button className="gsi-material-button" onClick={handleClick}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <GoogleIcon />
        </div>
        <span className="gsi-material-button-contents">
          Continue with Google
        </span>
      </div>
    </button>
  );
};
