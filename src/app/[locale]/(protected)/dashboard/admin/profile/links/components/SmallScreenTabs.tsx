import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LinkBuilderSidebar from "./LinkBuilderSidebar/page";
import GeneralStylesSidebar from "./GeneralStylesSidebar/page";
import {useTranslations} from "next-intl";

export default function SmallScreenTabs() {
  const t = useTranslations("LinksPage.generalStyles");
  return (
    <Tabs
      defaultValue="account"
      className="w-[400px]"
      defaultChecked={true}
      value="linkBuilder"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="linkBuilder">{t("linkBuilder")}</TabsTrigger>
        <TabsTrigger value="generalStyles">{t("styles")}</TabsTrigger>
      </TabsList>
      <TabsContent value="linkBuilder">
        <LinkBuilderSidebar />
      </TabsContent>
      <TabsContent value="generalStyles">
        <GeneralStylesSidebar />
      </TabsContent>
    </Tabs>
  );
}
