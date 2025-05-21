"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

export default function StatusCard({
  title,
  tryAgainMsg,
}: {
  title: string;
  tryAgainMsg?: string;
}) {

  return (
    <div className="pt-[3rem]">
      <Card className="flex justify-center items-center w-[300px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{tryAgainMsg}</CardDescription>
        </CardHeader>
        <CardContent>
          <CircleCheck
            className={tryAgainMsg ? "text-red-400" : "text-green-400"}
            size={40}
          />
        </CardContent>
      </Card>
    </div>
  );
}
