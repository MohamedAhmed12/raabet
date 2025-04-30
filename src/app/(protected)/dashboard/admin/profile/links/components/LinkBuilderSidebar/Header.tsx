"use client";

import { Link, useLinkStore } from "@/app/store/use-link-store";
import { Input } from "@/components/ui/input";
import { DashboardAccordion } from "../DashboardAccordion";
import { Textarea } from "@/components/ui/textarea";
import { updateSingleLink } from "@/app/actions/updateSingleLink";
import Image from "next/image";

export const Header = () => {
  const { link, setLink } = useLinkStore((state) => state);

  const handleLinkPropertyValChange = async (
    key: keyof typeof link,
    val: string | boolean | number
  ) => {
    setLink({ ...link, [key]: val });

    if (key.startsWith("user.")) {
      const userKey = key.split(".")[1];
      setLink({
        ...link,
        user: {
          ...link.user,
          [userKey]: val,
        },
      });
    } else {
      setLink({
        ...link,
        [key]: value,
      });
    }
    const result = await updateSingleLink(link.id, key, val);
    if (!result?.success) {
      console.error("Failed to update link:", result?.error);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLinkPropertyValChange("userName", event.target.value);
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleLinkPropertyValChange("bio", event.target.value);
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleLinkPropertyValChange("user.avatar", reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <DashboardAccordion
      mainLabel="Header"
      content="Configure your Profile Picture, Name and Bio. These settings will also be used as the image, title and description when your share your profile"
    >
      <div className="flex items-center gap-2">
        {link.user?.avatar && (
          <Image
            src={link.user.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border mb-1"
            width={64} // Set the width
            height={64} // Set the height
          />
        )}
        <Input
          id="picture"
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handlePhotoChange}
          capture="user"
        />
      </div>
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
