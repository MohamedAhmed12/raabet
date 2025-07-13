"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useState } from "react";

interface EditSocialLabelDialogProps {
  iconName?: iconNameType;
  placeholder?: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export const EditSocialLabelDialog = memo(function EditSocialLabelDialog({
  iconName = "pencil",
  placeholder = "Edit Label",
  initialValue = "",
  onSubmit,
}: EditSocialLabelDialogProps) {
  const [value, setValue] = useState(initialValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleDialogClose = useCallback(() => {
    onSubmit(value);
    setIsDialogOpen(false);
  }, [onSubmit, value]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      onSubmit(value);
      setIsDialogOpen(open);
    },
    [value, onSubmit]
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Icon
          name={iconName}
          size={16}
          className="cursor-pointer text-dashboard-primary mb-[3px]"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogTitle />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <DialogFooter className="mt-4 w-full">
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            onClick={handleDialogClose}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
