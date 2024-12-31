"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteSensor, getSensor, type Sensor } from "~/api/sensors";
import { ConfirmDeleteModal } from "~/components/ConfirmDeleteModal";
import FullPageLoader from "~/components/FullPageLoader";
import { MoistureChart } from "~/components/TempChart";
import { Button } from "~/components/ui/button";

export default function SensorDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchSensor = async () => {
      if (id) {
        const res = await getSensor(id as string);
        setSensor(res);
      }
    };

    fetchSensor();
  }, [id]);

  const handleDeleteSensor = async () => {
    const res = await deleteSensor(id as string);
    if (res) router.push("/dashboard");
  };

  return !sensor ? (
    <FullPageLoader />
  ) : (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-green-400 hover:text-green-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Sensor
          </Button>
        </div>

        <MoistureChart />

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSensor}
          sensorName={sensor.name}
        />
      </div>
    </div>
  );
}
