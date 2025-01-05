import { useState } from "react";
import { type Plant } from "~/api/sensors";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

type AddSensorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddSensor: (name: string, location: string, plantType: Plant) => void;
};

export const AddSensorModal = ({
  isOpen,
  onClose,
  onAddSensor,
}: AddSensorModalProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [plantType, setPlantType] = useState<Plant>("succulent");

  const handleSubmit = () => {
    if (name && location && plantType) {
      onAddSensor(name, location, plantType);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Add New Sensor
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Nome do Sensor */}
          <Input
            placeholder="Sensor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300"
          />
          {/* Localização */}
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-gray-300"
          />
          {/* Tipo de Planta */}
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value as Plant)}
            className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 shadow-sm"
          >
            <option value="" disabled>
              Select Plant Type
            </option>
            <option value="succulent">Succulent</option>
            <option value="house">House Plant</option>
            <option value="fern">Fern</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {/* Botão Cancelar */}
          <Button
            variant="outline"
            className="text-gray-600 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </Button>
          {/* Botão Adicionar */}
          <Button
            className="bg-green-600 text-white hover:bg-green-500"
            onClick={handleSubmit}
          >
            Add Sensor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
