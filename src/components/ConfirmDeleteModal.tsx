"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  sensorName: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  sensorName,
}: ConfirmDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-green-700 bg-[#0a0a0a] text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400">Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300">
          Are you sure you want to delete the sensor {sensorName}? This action
          cannot be undone.
        </p>
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-green-600 bg-[#171717] text-gray-100 hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <>
                  <Loader2 className="animate-spin" />
                  Deleting...
                </>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
