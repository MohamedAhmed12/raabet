'use client';

import * as React from 'react';

import { BlockType } from '@/app/[locale]/(protected)/dashboard/admin/profile/links/types/block';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Block } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/Icon';

export const ButtonTypeDropdown = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (key: keyof Block, val: string) => void;
}) => {
  const [btnType, setBtnType] = React.useState(block.type);

  const t = useTranslations('LinksPage.generalStyles.blockForm');

  const linkOptions: {
    label: string;
    value: string;
    inputType: 'text' | 'file';
    placeholder?: string | undefined;
  }[] = [
    {
      label: t('btnType.link'),
      value: 'url',
      inputType: 'text',
      placeholder: 'https://example.com/',
    },
    {
      label: t('btnType.email'),
      value: 'email',
      inputType: 'text',
      placeholder: 'hello@example.com',
    },
    { label: t('btnType.image'), value: 'image', inputType: 'file' },
    { label: t('btnType.file'), value: 'file', inputType: 'file' },
  ];
  const selectedType = React.useMemo(
    () => linkOptions.find((opt) => opt.value === btnType) || linkOptions[0],
    [btnType]
  );

  const handleTypeSelected = (value: string) => {
    setBtnType(value as BlockType);
    onChange('type', value);
  };

  return (
    <div className="flex flex-col font-inherit gap-5">
      <div className="w-1/3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{t('btnType.btnTypes')}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 font-noto-sans"
            align="start"
            alignOffset={3}
          >
            <DropdownMenuLabel>{t('btnType.btnTypes')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={btnType}
              onValueChange={handleTypeSelected}
            >
              {linkOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.label}
                  value={option.value}
                  className="capitalize"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* {btnType && (
        <div className="flex flex-col gap-2">
          <Label>{selectedType.label}</Label>

          <Input
            id={btnType}
            type="text"
            placeholder={selectedType.placeholder}
            value={block.url}
            className="mb-[14px]"
            onChange={(e) => onChange("url", e.currentTarget.value)}
          />
        </div>
      )} */}
      {/* {selectedType.inputType === 'text' ? (
        <div className="flex flex-col gap-2">
          <Label>{selectedType.label}</Label>
          <Input
            id={btnType}
            type="text"
            placeholder={selectedType.placeholder}
            value={block.url}
            className="mb-[14px]"
            onChange={(e) => onChange('url', e.currentTarget.value)}
          />
        </div>
      ) : (
        block.bg_image && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 mb-2 px-4 p-5 relative border rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <Icon name="circle-help" />
                <label
                  htmlFor="bg_upload"
                  className="file-upload-label text-sm flex"
                >
                  {t('uploadedFile')}
                </label>
              </div>
              <Icon name="upload" />
            </div>

            <Input
              id="bg_upload"
              type="file"
              className="mb-[14px] hidden"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  onChange('bg_image', file.name); // Replace with actual upload logic
                }
              }}
            />
          </div>
        )
      )} */}

      {btnType &&
        (selectedType.inputType === 'text' ? (
          <div className="flex flex-col gap-2">
            <Label>{selectedType.label}</Label>
            <Input
              id={btnType}
              type="text"
              placeholder={selectedType.placeholder}
              value={block.url}
              className="mb-[14px]"
              onChange={(e) => onChange('url', e.currentTarget.value)}
            />
          </div>
        ) : !block.bg_image ? (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="bg_upload"
              className="file-upload-label text-sm flex items-center justify-between gap-2 mb-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon name="circle-help" className="text-blue-500 !w-4 !h-4" />
                {t('uploadedFile')}
              </div>
              <div className="border rounded-4xl p-2">
                <Icon name="upload" />
              </div>
            </label>

            <Input
              id="bg_upload"
              type="file"
              className="mb-[14px] hidden"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  onChange('bg_image', file.name);
                }
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="bg_upload"
              className="file-upload-label text-sm flex items-center justify-between gap-2 mb-2 px-4 p-3 relative border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon name="circle-help" className="text-blue-500 !w-4 !h-4" />
                {block.bg_image}
              </div>
              <div className="border rounded-4xl p-2">
                <Icon name="upload" />
              </div>
            </label>

            <Input
              id="bg_upload"
              type="file"
              className="mb-[14px] hidden"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  onChange('bg_image', file.name); // Replace with actual upload logic
                }
              }}
            />
          </div>
        ))}
    </div>
  );
};
