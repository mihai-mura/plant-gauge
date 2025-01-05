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
      <DialogContent className="rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          Are you sure you want to delete the sensor{" "}
          <span className="font-semibold text-gray-800">{sensorName}</span>? This
          action cannot be undone.
        </p>
        <DialogFooter className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Deleting...
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
