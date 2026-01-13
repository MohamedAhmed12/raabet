"use client";

import {
  SiInstagram,
  SiTiktok,
  SiWhatsapp,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Mail, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactCard } from "./ContactCard";

export const ContactSection = () => {
  const t = useTranslations("Contact");

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto w-full h-full flex flex-col">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="flex gap-2 justify-center text-4xl md:text-6xl font-bold text-deep-blue-gray mb-6">
          <span className="relative">
            <span className="relative inline-block z-[1]">{t("contact")}</span>
            <div className="absolute inset-0 top-[0.7em] bottom-0 left-[-3%] right-[-3%] bg-light-orange"></div>
          </span>
          <span className="relative inline-block">{t("us")}</span>
        </h1>
        <h2 className="text-lg text-gray-600 leading-relaxed">
          {t("description")}
        </h2>
      </div>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <ContactCard icon={<SiWhatsapp size={35} />} title={t("chat")} />
          <ContactCard
            icon={<Mail size={35} />}
            title={t("email")}
            href="mailto:support@rabet-link.com"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <ContactCard
            icon={<SiTiktok className="w-[35px] h-[35px]" />}
            title={t("tiktok")}
            href="https://www.tiktok.com/@rabetlink?_t=ZS-90R2oaQBTHd&_r=1&utm_source=rabetlink.com&utm_medium=website&utm_campaign=tiktok_profile"
          />
          <ContactCard
            icon={<X size={35} />}
            title={t("twitter")}
            href="https://x.com/RabetLink?utm_source=rabetlink.com&utm_medium=website&utm_campaign=twitter_profile"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <ContactCard
            icon={<SiInstagram size={35} />}
            title={t("instagram")}
            href="https://www.instagram.com/rabetlink?igsh=Z291c2RnOWF2M2F0&utm_source=rabetlink.com&utm_medium=website&utm_campaign=instagram_profile"
          />
          <ContactCard icon={<SiYoutube size={35} />} title={t("email")} />
        </div>
      </div>
    </section>
  );
};
