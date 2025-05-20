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
import { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  const handleBlur = () => {
    setIsFocused(false);
    onSubmit(value);
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
          onFocus={handleFocus}
          onChange={handleSubmit}
          onBlur={handleBlur}
        />
        <DialogFooter className="mt-4 w-full">
          <Button
            className="w-full cursor-pointer bg-black hover:bg-black"
            onClick={() => setIsDialogOpen(false)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
