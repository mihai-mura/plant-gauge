"use client";

import { Loader2, Shrub, Sprout, TreePalm } from "lucide-react";
import { useState } from "react";
import { type Plant } from "~/api/sensors";
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
  onAddSensor: (
    name: string,
    location: string,
    plantType: Plant,
  ) => Promise<void>;
}

export function AddSensorModal({
  isOpen,
  onClose,
  onAddSensor,
}: AddSensorModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [plantType, setPlantType] = useState<Plant>("succulent");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;
    setIsLoading(true);
    await onAddSensor(name, location, plantType);
    setName("");
    setLocation("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-green-700 bg-[#0a0a0a] text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-600">Add New Sensor</DialogTitle>
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
          <div>
            <Label className="text-gray-300">Plant Type</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                className={`${
                  plantType === "succulent" ? "bg-green-700" : "bg-gray-700"
                } transform rounded-full text-white active:scale-95`}
                onClick={() => setPlantType("succulent")}
              >
                <Shrub />
                Succulent
              </Button>
              <Button
                type="button"
                className={`${
                  plantType === "house" ? "bg-green-700" : "bg-gray-700"
                } transform rounded-full text-white active:scale-95`}
                onClick={() => setPlantType("house")}
              >
                <Sprout />
                Houseplant
              </Button>
              <Button
                type="button"
                className={`${
                  plantType === "fern" ? "bg-green-700" : "bg-gray-700"
                } transform rounded-full text-white active:scale-95`}
                onClick={() => setPlantType("fern")}
              >
                <TreePalm />
                Fern
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="transform rounded-full bg-green-700 text-white hover:bg-green-600 active:scale-95"
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
