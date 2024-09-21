"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
}

export function Modal({ title, children }: ModalProps) {
  const router = useRouter();

  function handleOpenChange() {
    router.back();
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        className="sm:tw-max-w-[425px]"
        aria-describedby={title && title.length ? title : undefined}
      >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
