"use client";

import { useState } from "react";
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

interface EditSocialLabelDialogProps {
  iconName?: iconNameType;
  placeholder?: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export const EditSocialLabelDialog = ({
  iconName = "pencil",
  placeholder = "Edit Label",
  initialValue = "",
  onSubmit,
}: EditSocialLabelDialogProps) => {
  const [value, setValue] = useState(initialValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onSubmit(value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Icon
          name={iconName}
          size={16}
          className="cursor-pointer text-dashboard-primary mb-[3px]"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogTitle></DialogTitle>

        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
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
};
