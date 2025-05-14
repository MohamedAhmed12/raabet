"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { FieldController } from "../../../components/FieldController";
import { HelperTooltip } from "../../../components/HelperTooltip";

export function CustomForm({
  label,
  title,
  tooltipContent,
  submitText,
  placeholder,
  prefix,
  btnBelow = true,
}: Readonly<{
  label?: string;
  title: string;
  tooltipContent?: React.ReactNode;
  submitText: string;
  placeholder: string;
  prefix?: string;
  btnBelow?: boolean;
}>) {
  const locale = useLocale();
  const t = useTranslations();
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: t("Errors.username"),
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast.success("You submitted the following values:", {
    //   description: 'ddddddddddddddd',
    // });
    // toast("Event has been created", {
    //   description: "Sunday, December 03, 2023 at 9:00 AM",
    // });
    // toast("Event has been created.")
    toast.success("dd");
  }

  return (
    <FieldController title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem className="space-y-3">
                {label && (
                  <FormLabel className="font-semisbold capitalize">
                    {tooltipContent && (
                      <HelperTooltip content={tooltipContent} />
                    )}
                    {label}
                  </FormLabel>
                )}
                <FormControl>
                  <div
                    className={cn(
                      "flex justify-between space-x-3 space-y-3",
                      btnBelow && "flex-col"
                    )}
                  >
                    <span className="flex">
                      {prefix && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "shadow-xs border-input",
                            locale == "ar" ? "rounded-l-none border-l-0" : "rounded-r-none border-r-0"
                          )}
                        >
                          {prefix}
                        </Badge>
                      )}
                      <Input
                        placeholder={placeholder}
                        {...field}
                        className={
                          prefix &&
                          (locale == "ar" ? "rounded-r-none border-r-0" : "rounded-l-none border-r-0")
                        }
                      />
                    </span>
                    <Button
                      type="submit"
                      color="red"
                      variant="outline"
                      className="capitalize"
                    >
                      {submitText}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FieldController>
  );
}
