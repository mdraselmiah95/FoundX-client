import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
      {children}
    </div>
  );
};

export default Container;
