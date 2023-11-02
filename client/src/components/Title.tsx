import React, { PropsWithChildren } from "react";

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-5xl font-extrabold text-white font-inter mb-10">
      {children}
    </h1>
  );
};

export default Title;
