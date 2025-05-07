"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { DashboardAccordion } from "../DashboardAccordion";
import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { updateUserAvatar } from "@/app/[locale]/actions/updateUserAvatar";

export const Header = () => {
  const { link, setLink } = useLinkStore((state) => state);
  const [uploading, setUploading] = useState(false); 

  const handleLinkPropertyValChange = async (
    key: keyof typeof link,
    val: string | boolean | number
  ) => {
    // setLink({ ...link, [key]: val });
    if (!link.id) {
      console.error("Link ID is undefined.");
      return;
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

    setUploading(true);

    const fileName = `${link.id}-${Date.now()}-${file.name}`;

    try {
      const res = await fetch("/api/getPresignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, contentType: file.type }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate presigned URL: ${res.statusText}`);
      }

      const data = await res.json();

      if (!data.presignedUrl) {
        throw new Error("Presigned URL is missing in the response.");
      }

      const presignedUrl = data.presignedUrl;

      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload to Google Cloud Storage failed.");
      }
      const publicUrl = presignedUrl.split("?")[0];

      await updateUserAvatar(link.user.id, "avatar", publicUrl);
      setLink({
        ...link,
        user: {
          ...link.user,
          avatar: publicUrl,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
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
          disabled={uploading} // Disable input while uploading
        />
        {uploading && <span>Uploading...</span>}
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
        placeholder="Bio"
        value={link.bio}
        className="mb-[14px]"
        onChange={handleBioChange}
      />
    </DashboardAccordion>
  );
};
