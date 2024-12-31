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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSensor: (name: string, location: string) => Promise<void>;
}

export function AddSensorModal({
  isOpen,
  onClose,
  onAddSensor,
}: AddSensorModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onAddSensor(name, location);
    setName("");
    setLocation("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-green-700 bg-[#0a0a0a] text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400">Add New Sensor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-green-600 bg-[#171717] text-gray-100 focus:border-green-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-gray-300">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-green-600 bg-[#171717] text-gray-100 focus:border-green-500"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-700 text-white hover:bg-green-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding Sensor...
                </>
              ) : (
                "Add Sensor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
