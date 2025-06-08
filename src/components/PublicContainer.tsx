"use client";

import { Header } from "./Header";

export const PublicContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Header />
      <div className="pt-16">{children}</div>
    </div>
  );
};
