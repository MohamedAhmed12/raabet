"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link, Mail } from "lucide-react";
import { useState } from "react";
import { Icon } from "../Icon";

export const Footer = () => {
  const [subscribed, setSubscribed] = useState(true);
  const t = useTranslations();

  return (
    <footer className="flex items-start justify-between bg-deep-blue-gray text-gray-300 font-noto-sans text-gray-300 py-[60px] px-[7vw]">
      <div className="flex gap-21">
        <div className="flex flex-col gap-5">
          <NextLink href="/" className="flex items-center gap-1 text-white">
            <Link
              size={21}
              width={21}
              strokeWidth={3.5}
              fontWeight={800}
              className="text-[#1b97f5]"
            />
            <span className="text-3xl font-bold capitalize">
              {t("Shared.rabet")}
            </span>
          </NextLink>

          <div>
            {t("Footer.CentralizePresence")}
            <br />
            {t("Footer.BuiltWith")}

            {/* put my rabet page in the future after creating more of the leade generating free projects */}
            <a className="mx-1" target="_blank">
              Gad
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold text-white">
            {t("Footer.resources")}
          </div>
          <div className="flex flex-col gap-1 !text-sm">
            <a className="" href="/contact">
              {t("Shared.contactUs")}
            </a>
            {/* implement next  */}
            {/* 
                <a   
                href="/i/qr-code"
                >
                <div>Free: QR Code Maker</div>
                </a>
                <a
                
                href="https://www.mock.club"
                target="_blank"
                >
                <div>Free: Device Mockups</div>
                </a>
                <a
                
                href="https://www.wallpaper.fm/"
                target="_blank"
                >
                <div>Free: Background Images</div>
                </a> 
            */}
            <a href="/auth/sign-up">{t("Shared.signup")}</a>
            <a href="/auth/login">{t("Shared.login")}</a>
            {/* 
                <a href="/i/terms-of-service" target="_blank">
                <div>Terms of Service</div>
                </a>
                <a href="/i/cookie-policy" target="_blank">
                <div>Cookie Policy</div>
                </a>
                <a href="/i/privacy-policy" target="_blank">
                <div>Privacy Policy</div>
                </a> 
            */}
          </div>
        </div>
      </div>

      <div className="w-[350px] flex flex-col gap-4 justify-center items-start">
        <div className="text-xl font-semibold text-white">
          {t("Footer.stayUpdated")}
        </div>
        {!subscribed ? (
          <form>
            <div className="_qo_brXIbOZpSxH1dcNd eIh4rDKdwxCp5Fw_UTiO B6cdAyxk9GHZgh4SEt2Y KbCJhzUAWSQdXGsajLOI A5HpOJwBfHgYfw0b84qM">
              <input
                className="y4_ZnMQbMH1UqNWvQq6r"
                placeholder="Email address"
                type="email"
                value=""
              />
              <div className="cKsO2UkidGJSdggWoR_z">
                <button
                  className="_qo_brXIbOZpSxH1dcNd T3z29C3ejLKSiaC6QxjO RyE4RX5QSruO9uKaHMdQ FAwXT6Q1DAwo8f7PgevQ aFMO3KPVWNCFO6opubQE MwJNasBFRJ9VVDqD4w9X dPefoOO4s6kXRyLtxaiA"
                  type="submit"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-1 text-sm">
            <div>Thanks for subscribing!</div>
            <div>Watch your inbox for product updates.</div>
          </div>
        )}
        <div className="flex gap-3 w-full">
          <a
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-primary w-10 h-10 rounded-full"
            title="Email"
            href="mailto:contact@rabet.co"
          >
            <Mail />
          </a>
          <a
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-green-200 w-10 h-10 rounded-full"
            title="X (Twitter)"
            href="https://twitter.com/rabet"
            target="_blank"
          >
            <Icon name="linkedin" className="!w-5 !h-5" />
          </a>
          <a
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-orange-200 w-10 h-10 rounded-full"
            title="X (Twitter)"
            href="https://twitter.com/rabet"
            target="_blank"
          >
            <Icon name="twitter" className="!w-5 !h-5" />
          </a>
          <a
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-red-200 w-10 h-10 rounded-full"
            title="Instagram"
            href="https://www.instagram.com/rabet/"
          >
            <Icon name="instagram" className="!w-5 !h-5" />
          </a>
          <a
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-stone-200 w-10 h-10 rounded-full"
            title="Linkedin"
            href="https://www.youtube.com/@rabet"
            target="_blank"
          >
            <Icon name="youtube" className="!w-5 !h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
