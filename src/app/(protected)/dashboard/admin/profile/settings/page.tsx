import { DashboardContainer } from "../../components/DashboardContainer";
import { MainTitle } from "../../components/MainTitle";
import { FieldController } from "../../components/FieldController";
import DashboardLayout from "../../layout";
import { CustomForm } from "../../components/CustomForm";
import { ChangeEmailDialog } from "../../components/ChangeEmailDialog";

export default function ProfileSettings() {
  return (
    <>
      <MainTitle
        title="settings"
        subTitle="Configure our account details and integrations."
      ></MainTitle>

      <ChangeEmailDialog title="email" />

      <CustomForm
        title="username"
        prefix="raabet.com/"
        submitText="update google analytics ID"
        placeholder="Your name"
      />
      <CustomForm
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
      />
      {/* <CustomForm title="Instagram sync" prefix="raabet.com/" submitText="update google analytics ID" placeholder="G-XXXXXXXXXX" /> */}

      {/* <FieldController title="email">s</FieldController> */}
      {/* <FieldController title="username">s</FieldController> */}
    </>
  );
}
