"use client";

import { Footer } from "./public/Footer";
import { Header } from "./public/Header";

export const PublicContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-16 flex-1">{children}</div>
      <Footer />
    </div>
  );
};
