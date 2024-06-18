import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-screen bg-secondary flex flex-col py-12 sm:px-6 lg:px-8 ">
      {/* <!-- Header --> */}
      {children}
      {/* <!-- Footer --> */}
    </div>
  );
};
