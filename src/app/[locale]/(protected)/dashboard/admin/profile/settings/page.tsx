import { getTranslations } from "next-intl/server";
import { ChangeEmailDialog } from "./components/ChangeEmailDialog";
import { CustomForm } from "./components/CustomForm";
import { MainTitle } from "./components/MainTitle";

export default async function ProfileSettings() {
  const t = await getTranslations();

  return (
    <div className="w-full max-w-[650px]">
      <MainTitle
        title={t("Settings.title")}
        subTitle={t("Settings.subTitle")}
      ></MainTitle>

      <ChangeEmailDialog title={t("Shared.email")} />

      <CustomForm
        title={t("Settings.usernameForm.title")}
        prefix="raabet.com/"
        submitText={t("Settings.usernameForm.submitText")}
        placeholder={t("Settings.usernameForm.placeholder")}
      />

      {/* to be added in future release */}
      {/* <CustomForm
        title="google analytics"
        label="google analytics ID"
        submitText="update google analytics ID"
        placeholder="G-XXXXXXXXXX"
        tooltipContent={
          <p>
            Integrating Google Analytics gives you robust tracking of visits to
            your Raabet profile.
          </p>
        }
      />
      <CustomForm
        title="facebook pixel"
        label="pixel ID"
        submitText="update pixel ID"
        placeholder="Pixel ID"
        tooltipContent={
          <p>
            Integrating a Facebook Pixel enables conversion tracking and
            remarketing based on your Raabet page's views and clicks.
            <br />
            <br /> Click ? to learn more.
          </p>
        }
      /> */}

      {/* to be added in future release */}
      {/* <CustomForm title="Instagram sync" prefix="raabet.com/" submitText="update google analytics ID" placeholder="G-XXXXXXXXXX" /> */}
    </div>
  );
}
