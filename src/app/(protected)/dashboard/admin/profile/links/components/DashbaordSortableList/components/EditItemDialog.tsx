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
  onSubmit: (value: string) => void;
}

export const EditInputDialog = ({
  iconName = 'pencil',
  placeholder = 'Edit Label',
  onSubmit,
}: EditInputDialogProps) => {
  const [value, setValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const handleSubmit = () => {
    onSubmit(value);
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
      <DialogTitle>
        </DialogTitle>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <DialogFooter className="mt-4 w-full">
          <Button className="w-full cursor-pointer bg-black hover:bg-black" onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
