import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { type Plant } from "~/api/sensors";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface EditPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    name: string,
    location: string,
    plantType: Plant,
  ) => Promise<void>;
  sensorName: string;
  sensorLocation: string;
  plantType: Plant;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sensorName,
  sensorLocation,
  plantType,
}) => {
  const [name, setName] = useState(sensorName);
  const [location, setLocation] = useState(sensorLocation);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(name, location, plantType);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-green-600">
            Edit Plant
          </DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="ml-2 bg-green-600 hover:bg-green-500"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlantModal;
