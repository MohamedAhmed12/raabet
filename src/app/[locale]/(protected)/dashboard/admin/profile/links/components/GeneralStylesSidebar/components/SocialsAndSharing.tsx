import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";
import { Input } from "@/components/ui/input";
import { GCSFileLoader } from "../../LinkBuilderSidebar/GCSFileLoader";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Share2, Upload, User } from "lucide-react";
import { useLinkStore } from "../../../../../../../../store/use-link-store";

type ContentProps = {
  t: (key: string) => string;
};

type ContentFunction = (props: ContentProps) => React.ReactNode;

export const content: Record<string, ContentFunction> = {
  "Enable Add Contact": (props) => (
    <span>
      {props.t("enableAddContactTooltip")}
      <User className="inline !w-4 !h-4 mx-[2px] mb-[5px]" />
      {props.t("enableAddContactTooltipAfter")}
      <a
        href="https://en.wikipedia.org/wiki/VCard"
        target="_blank"
        rel="noopener noreferrer"
        className="underline mx-1"
      >
        vCard
      </a>
      {props.t("enableAddContactTooltipAfter2")}
    </span>
  ),
  "Enable Share Button": (props) => (
    <>
      <span>{props.t("enableShareButtonTooltip")}</span>
      <span>
        <Share2 className="inline !w-3.5 !h-3.5 mx-1 mb-[3px]" />
      </span>
      <span>{props.t("enableShareButtonTooltipAfter")}</span>
    </>
  ),
  "Click For QR Code": (props) => (
    <span>{props.t("clickForQRCodeTooltip")}</span>
  ),
  "hide raabet branding": (props) => (
    <span>{props.t("hideRaabetBrandingTooltip")}</span>
  ),
  // "enable verified badge": (
  //   <span>
  //     Enabling this will display a{" "}
  //     <Icon name="badgeCheck" className="inline !w-4 !h-4 text-blue-500" /> icon
  //     to the top left of next to your username. In order to activate your
  //     verified badge, you&apos;ll need to request verification in the{" "}
  //     <Link href="/dashboard/admin/profile/settings" className="underline">
  //       Settings tab
  //     </Link> .
  //   </span>
  // ),
};

export default function SocialsAndSharing() {
  const t = useTranslations("SocialsAndSharing");
  const { handleLinkPropertyValChange } = useUpdateLink();
  const linkRaw = useLinkStore((state) => state.linkRaw);

  const getTooltipContent = (key: string) => {
    const contentFunction = content[key];
    return contentFunction ? contentFunction({ t }) : null;
  };

  const handleFileUploader = async (
    e: React.ChangeEvent<HTMLInputElement>,
    linkId: string
  ) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        const publicUrl = await GCSFileLoader(linkId, file);
        handleLinkPropertyValChange("social_custom_logo", publicUrl);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="section">
      <div className="section-title text-[.82rem] font-bold mb-[22px]">
        {t("sectionTitle")}
      </div>
      <DashboardSwitch
        label={t("enableAddContact")}
        checked={linkRaw.social_enable_add_contacts}
        tooltipContent={getTooltipContent("Enable Add Contact")}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_add_contacts", checked)
        }
      />

      <DashboardSwitch
        label={t("enableShareButton")}
        checked={linkRaw.social_enable_share_btn}
        tooltipContent={getTooltipContent("Enable Share Button")}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_share_btn", checked)
        }
      />
      <DashboardSwitch
        label={t("clickForQRCode")}
        checked={linkRaw.social_enable_qr_code}
        tooltipContent={getTooltipContent("Click For QR Code")}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_qr_code", checked)
        }
      />
      <DashboardSwitch
        label={t("hideRaabetBranding")}
        checked={linkRaw.social_enable_hide_raabet_branding}
        tooltipContent={getTooltipContent("hide raabet branding")}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "social_enable_hide_raabet_branding",
            checked
          )
        }
      />
      {linkRaw.social_enable_hide_raabet_branding && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom_logo"
            className="file-upload-label text-sm flex items-center justify-between gap-2 mb-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm"
          >
            <span>{t("customLogo")}</span>
            {!linkRaw.social_custom_logo ? (
              <Upload className="size-5 border" />
            ) : (
              <Image
                src={linkRaw.social_custom_logo}
                alt="Custom logo"
                width={60}
                height={60}
              />
            )}
          </label>

          <Input
            id="custom_logo"
            type="file"
            className="mb-[14px] hidden"
            onChange={(e) => handleFileUploader(e, linkRaw.id)}
          />
          {linkRaw.social_custom_logo && (
            <DashboardSlider
              label="custom_logo_size"
              defaultValue={[0.02]}
              max={1}
              step={0.001}
              onValueChange={(value) =>
                handleLinkPropertyValChange(
                  "social_custom_logo_size",
                  value,
                  false
                )
              }
              onValueCommit={(value) =>
                handleLinkPropertyValChange("social_custom_logo_size", value)
              }
            />
          )}
        </div>
      )}

      {/* {link.social_enable_enable_verified_badge && (
        <Alert className="bg-amber-50  border-amber-200 mb-1">
          <AlertDescription className="text-zinc-700 text-xs">
            In order to activate your verified badge, you&apos;ll need to request
            verification in the{" "}
            <Link
              href="/dashboard/admin/profile/settings"
              className="underline"
            >
              Settings tab
            </Link>
            .
          </AlertDescription>
        </Alert>
      )} */}

      {/* <DashboardSwitch
        label="Enable Verified Badge"
        checked={link.social_enable_enable_verified_badge}
        tooltipContent={content["enable verified badge"]}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "social_enable_enable_verified_badge",
            checked
          )
        }
      /> */}
    </div>
  );
}
