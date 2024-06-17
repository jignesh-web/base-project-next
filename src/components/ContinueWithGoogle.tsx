import { GoogleIcon } from "@/icons/GoogleIcon";
import React from "react";

// Ref: https://developers.google.com/identity/branding-guidelines
export const ContinueWithGoogle = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="gsi-material-button" onClick={onClick}>
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
