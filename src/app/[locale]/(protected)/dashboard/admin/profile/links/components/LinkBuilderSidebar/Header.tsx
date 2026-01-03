"use client";

import { updateUser } from "@/app/[locale]/(protected)/dashboard/admin/profile/links/actions/updateUser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useGetLink, useUpdateLinkField } from "../../hooks/useUpdateLink";
import { DashboardAccordion } from "../DashboardAccordion";
import { GCSFileLoader } from "./GCSFileLoader";

export const Header = () => {
  const t = useTranslations("LinksPage.generalStyles.header");
  const tShared = useTranslations("Shared");

  // Get link from React Query
  const getLink = useGetLink();
  const link = getLink();

  // Get update function
  const updateLinkField = useUpdateLinkField();
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(link?.displayname || "");
  const [bioValue, setBioValue] = useState(link?.bio || "");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBioValue(event.target.value);
  };

  const handleNameBlur = () => {
    startTransition(() => {
      updateLinkField("displayname", inputValue || "", true);
    });
  };

  const handleBioBlur = () => {
    startTransition(() => {
      updateLinkField("bio", bioValue || "", true);
    });
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !link?.id) return;
    setUploading(true);

    try {
      const publicUrl = await GCSFileLoader(link.id, file);
      await updateUser({ id: link?.user?.id }, { avatar: publicUrl });

      // Update user avatar in cache (cache-only, no DB persistence needed)
      if (link?.user) {
        queryClient.setQueriesData({ queryKey: ["link"] }, (old: any) => {
          if (!old) return old;
          return {
            ...old,
            user: {
              ...old.user,
              avatar: publicUrl,
            },
          };
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!link) return null;

  return (
    <DashboardAccordion mainLabel={t("title")} content={t("description")}>
      <div className="flex items-center gap-2">
        {link?.user?.avatar && (
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
          className="w-full cursor-pointer"
          onChange={handlePhotoChange}
          disabled={uploading}
        />
        {uploading && (
          <span className="whitespace-nowrap">{tShared("uploading")}</span>
        )}
      </div>
      <Input
        id="name"
        type="name"
        placeholder={t("fields.name")}
        value={inputValue}
        className="mb-[14px]"
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onFocus={() => setIsFocused(true)}
      />
      <Textarea
        id="textarea"
        placeholder={t("fields.bio")}
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
