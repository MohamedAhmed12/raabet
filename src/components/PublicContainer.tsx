"use client";

import { Footer } from "./public/Footer";
import { Header } from "./public/Header";

export const PublicContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Header />
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
};
