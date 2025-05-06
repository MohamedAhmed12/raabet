"use client";

import {Icon} from "@/components/Icon";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {useTranslations} from 'next-intl';

export default function DashboardNotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex w-full pt-[55px] pb-[110px] justify-center">
      <Card className="flex p-11 justify-center items-center bg-trasnparent !shadow-none border-0 text-gray-500">
        <CardHeader>
          <Icon name="user" size={150} strokeWidth={1} />
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center text-2xl">
          <p>{t("something_went_wrong")} </p>
        </CardContent>
      </Card>
    </div>
  );
}
