'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';
import { useState } from 'react';

interface EditInputDialogProps {
  iconName?: string;
  placeholder?: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

export const EditInputDialog = ({
  iconName = 'pencil',
  placeholder = 'Edit Label',
  initialValue = '',
  onSubmit,
}: EditInputDialogProps) => {
  const [value, setValue] = useState(initialValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSubmit(newValue);
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
          onChange={handleSubmit}
        />
        <DialogFooter className="mt-4 w-full">
          <Button
            className="w-full cursor-pointer bg-black hover:bg-black"
            onClick={()=>setIsDialogOpen(false)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
