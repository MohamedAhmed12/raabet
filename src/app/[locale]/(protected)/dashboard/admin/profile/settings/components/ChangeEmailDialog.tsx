import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { FieldController } from "../../../components/FieldController";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function ChangeEmailDialog({title}: Readonly<{title?: string}>) {
  const t = await getTranslations("Shared");
  const session = await getServerSession(authOptions);
  // @ts-expect-error: [to access user data in session it exists in id]
  const user = session?.user?.id;
  const isConfirmed = !!user?.is_confirmed;
  const email = user?.email || "";

  return (
    <FieldController
      title={title}
      titleIcon={
        <div
          className={cn(
            "text-right",
            isConfirmed ? "text-green-700" : "text-red-600"
          )}
        >
          {isConfirmed ? t("confirmed") : t("needConfirmation")}
        </div>
      }
    >
      <Button
        variant="outline"
        className="w-full flex justify-between cursor-not-allowed"
      >
        {email}
      </Button>
    </FieldController>
  );
}
