import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { FieldController } from "./FieldController";

export function ChangeEmailDialog({ title }: Readonly<{ title?: string }>) {
  const confirmed = true;
  const email = "email@google.com";

  return (
    <FieldController
      title={title}
      titleIcon={
        <div
          className={cn(
            "w-full text-right",
            confirmed ? "text-green-700" : "text-red-600"
          )}
        >
          {confirmed ? "confirmed" : "need confirmation"}
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
