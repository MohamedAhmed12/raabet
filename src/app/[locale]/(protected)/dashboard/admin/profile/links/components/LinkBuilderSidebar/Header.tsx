"use client";

import { updateUser } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/actions/updateUser";
import { updateSingleLink } from "@/app/[locale]/actions/updateSingleLink";
import { Link, useLinkStore } from "@/app/[locale]/store/use-link-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";
import { DashboardAccordion } from "../DashboardAccordion";
import { GCSFileLoader } from "./GCSFileLoader";

export const Header = () => {
  const t = useTranslations("LinksPage.generalStyles");
  const { link, setLink, replaceLink } = useLinkStore(
    useShallow((state) => ({
      link: state.link,
      setLink: state.setLink,
      replaceLink: state.replaceLink,
    }))
  );

  const [uploading, setUploading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(link.displayname);
  const [bioValue, setBioValue] = useState(link.bio);

  const handleLinkPropertyValChange = async (
    key: string,
    val: string | boolean | number
  ) => {
    await updateSingleLink(link.id, key, val);
    setLink({ key: key as keyof Link, value: val });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBioValue(event.target.value);
  };

  const handleNameBlur = () => {
    startTransition(() => {
      handleLinkPropertyValChange("displayname", inputValue || "");
    });
  };

  const handleBioBlur = () => {
    startTransition(() => {
      handleLinkPropertyValChange("bio", bioValue || "");
    });
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const publicUrl = await GCSFileLoader(link.id, file);
      await updateUser({ id: link?.user?.id }, { avatar: publicUrl });
      replaceLink((prev) => {
        const preUser = prev?.user;
        if (!preUser) return prev;

        return {
          ...prev,
          user: {
            ...preUser,
            avatar: publicUrl,
          },
        };
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardAccordion
      mainLabel={t("header")}
      content="Configure your Profile Picture, Name and Bio. These settings will also be used as the image, title and description when your share your profile"
    >
      <div className="flex items-center gap-2">
        {link.user?.avatar && (
          <Image
            src={link.user.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border mb-1"
            width={64}
            height={64}
          />
        )}
        <Input
          id="picture"
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handlePhotoChange}
          capture="user"
          disabled={uploading}
        />
        {uploading && <span>Uploading...</span>}
      </div>
      <Input
        id="name"
        type="name"
        placeholder="Name"
        value={inputValue}
        className="mb-[14px]"
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onFocus={() => setIsFocused(true)}
      />
      <Textarea
        id="textarea"
        placeholder="Bio"
        value={bioValue}
        className="mb-[14px]"
        onChange={handleBioChange}
        onBlur={handleBioBlur}
        onFocus={() => setIsFocused(true)}
      />
      {isPending && !isFocused && <span>Updating...</span>}
    </DashboardAccordion>
  );
};
