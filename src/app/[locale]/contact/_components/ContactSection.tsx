import { useTranslations } from "next-intl";
import { ContactCard } from "./ContactCard";
import {
  SiInstagram,
  SiWhatsapp,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Mail, X } from "lucide-react";
import LinkedIn from "../../../../../public/svg/LinkedIn";

export const ContactSection = () => {
  const t = useTranslations("Contact");

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="flex gap-2 justify-center text-4xl md:text-6xl font-bold text-deep-blue-gray mb-6">
          <span className="relative">
            <span className="relative inline-block z-[1]">{t("contact")}</span>
            <div className="h-[15px] absolute inset-0 top-[0.73em] bottom-[0.15em] left-[-3%] right-[-3%] bg-light-orange"></div>
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
          <ContactCard icon={<Mail size={35} />} title={t("email")} />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <ContactCard icon={<SiYoutube size={35} />} title={t("email")} />
          <ContactCard
            icon={<SiInstagram size={35} />}
            title={t("instagram")}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <ContactCard icon={<LinkedIn className="w-[35px] h-[35px]" />} title={t("linkedin")} />
          <ContactCard icon={<X size={35} />} title={t("twitter")} />
        </div>
      </div>
    </section>
  );
};
