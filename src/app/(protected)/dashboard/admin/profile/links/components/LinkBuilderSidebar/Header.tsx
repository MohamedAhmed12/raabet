"use client";

import { Link, useLinkStore } from "@/app/store/use-link-store";
import { Input } from "@/components/ui/input";
import { DashboardAccordion } from "../DashboardAccordion";
import { Textarea } from "@/components/ui/textarea";

export const Header = () => {
  const { link, setLink } = useLinkStore((state) => state);

  const handleLinkPropertyValChange = (
    key: keyof Link,
    val: string | boolean | number
  ) => {
    setLink({ [key]: val });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLinkPropertyValChange("fullName", event.target.value);
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleLinkPropertyValChange("bio", event.target.value);
  };

  return (
    <DashboardAccordion mainLabel="Header" content="Configure your Profile Picture, Name and Bio. These settings will also be used as the image, title and description when your share your profile">
      <Input id="picture" type="file" className="mb-[14px]" />
      <Input
        id="name"
        type="name"
        placeholder="Name"
        value={link.userName}
        className="mb-[14px]"
        onChange={handleNameChange}
      />
      <Textarea
        id="textarea"
        placeholder="Name"
        value={link.bio}
        className="mb-[14px]"
        onChange={handleBioChange}
      />
    </DashboardAccordion>
  );
};
