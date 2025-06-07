import { useUpdateLink } from "../../../hooks/useUpdateLink";
import { DashboardSlider } from "../../DashboardSlider";
import { DashboardSwitch } from "../../DashboardSwitch";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { GCSFileLoader } from "../../LinkBuilderSidebar/GCSFileLoader";
import Image from "next/image";

export const content = {
  "Enable Add Contact": (
    <span>
      Enabling this will add a <Icon name="user" className="inline !w-4 !h-4" />{" "}
      icon to the top right of your page which will allow users to easily save
      your contact info via the{" "}
      <a
        href="https://en.wikipedia.org/wiki/VCard"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        vCard
      </a>{" "}
      format. We will automatically generate your vCard using your profile
      picture, display name, email, phone number and any other links provided in
      the Socials field.
    </span>
  ),
  "Enable Share Button": (
    <span>
      Enabling this will add a{" "}
      <Icon name="share" className="inline !w-4 !h-4" /> icon to the top left of
      your page which will allow users to easily copy the link to your page
      and/or share it.
    </span>
  ),
  "Click For QR Code":
    "With this enabled, you can click on your profile picture to bring up a QR code which links to your profile. Handy for sharing your profile with people you meet in person!",
  "hide raabet branding":
    "Hide the 'Made with raabet' logo at the bottom of your profile. You can optionally upload your own logo.",
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
  const { link, handleLinkPropertyValChange } = useUpdateLink();

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
        Social & Sharing
      </div>
      <DashboardSwitch
        label="Enable Add Contact"
        checked={link.social_enable_add_contacts}
        tooltipContent={content["Enable Add Contact"]}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_add_contacts", checked)
        }
      />

      <DashboardSwitch
        label="Enable Share Button"
        checked={link.social_enable_share_btn}
        tooltipContent={content["Enable Share Button"]}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_share_btn", checked)
        }
      />
      <DashboardSwitch
        label="Click For QR Code"
        checked={link.social_enable_qr_code}
        tooltipContent={content["Click For QR Code"]}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange("social_enable_qr_code", checked)
        }
      />
      <DashboardSwitch
        label="Hide raabet Branding"
        checked={link.social_enable_hide_raabet_branding}
        tooltipContent={content["hide raabet branding"]}
        onCheckedChange={(checked) =>
          handleLinkPropertyValChange(
            "social_enable_hide_raabet_branding",
            checked
          )
        }
      />
      {link.social_enable_hide_raabet_branding && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom_logo"
            className="file-upload-label text-sm flex items-center justify-between gap-2 mb-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm"
          >
            <span>Custom Logo</span>
            {!link.social_custom_logo ? (
              <Icon
                name="upload"
                className="border rounded-4xl p-2 !w-10 !h-10"
              />
            ) : (
              <Image
                src={link.social_custom_logo}
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
            onChange={(e) => handleFileUploader(e, link.id)}
          />
          {link.social_custom_logo && (
            <DashboardSlider
              label="custom_logo_size"
              defaultValue={[0.02]}
              max={1}
              step={0.001}
              onValueChange={(value) =>
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
