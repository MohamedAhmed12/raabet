import GeneralStylesSidebar from "../components/GeneralStylesSidebar";
import LinkBuilderSidebar from "../components/LinkBuilderSidebar";
import { LinkViewer } from "../components/LinkViewer/page";

export default function ProfileLinks() {
  return (
    <div className={"flex w-full h-full justify-between"}>
      <LinkBuilderSidebar />
      <LinkViewer />
      <GeneralStylesSidebar />
    </div>
  );
}
