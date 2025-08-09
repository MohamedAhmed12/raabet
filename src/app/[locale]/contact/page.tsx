import { PublicContainer } from "@/components/PublicContainer";
import { Metadata } from "next";
import { ContactSection } from "./_components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us - Rabet",
  description:
    "Get in touch with the Rabet team for support, feedback, or inquiries.",
};

export default function ContactPage() {
  return (
    <PublicContainer>
      <ContactSection />
    </PublicContainer>
  );
}
