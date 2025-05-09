import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LinkBuilderSidebar from "./LinkBuilderSidebar/page";
import GeneralStylesSidebar from "./GeneralStylesSidebar/page";
import {useTranslations} from "next-intl";

export default function SmallScreenTabs() {
  const t = useTranslations("LinksPage.generalStyles");
  return (
    <Tabs defaultValue="content" className="w-[400px] h-[65%]">
      <TabsList className="grid w-full grid-cols-2" >
        <TabsTrigger value="content">{t("linkBuilder")}</TabsTrigger>
        <TabsTrigger value="styles">{t("styles")}</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <LinkBuilderSidebar />
      </TabsContent>
      <TabsContent value="styles">
        <GeneralStylesSidebar />
      </TabsContent>
    </Tabs>
  );
}
