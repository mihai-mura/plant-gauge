"use client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addSensor, getUserSensors, type Sensor } from "~/api/sensors";
import { AddSensorModal } from "~/components/AddSensorModal";
import AuthHandler from "~/components/AuthHandler";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getUserId } from "~/utils/localStore";

export default function PlantSensorDashboard() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSensors = async () => {
      setSensors(await getUserSensors(getUserId()!));
    };

    fetchSensors();
  }, []);

  const handleAddSensor = async (name: string, location: string) => {
    const res = await addSensor(name, location);

    if (res) setSensors(await getUserSensors(getUserId()!));
  };

  return (
    <AuthHandler type="private">
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <div className="container mx-auto p-4 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-green-300">
              Sensors ({sensors.length})
            </h2>
            <Button
              className="bg-green-700 text-white hover:bg-green-600"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Sensor
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sensors.map((sensor) => (
              <Link href={`/dashboard/sensors/${sensor.id}`} key={sensor.id}>
                <Card className="transform border-green-700 bg-[#171717] transition-transform ease-in-out hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-green-400">
                      {sensor.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {sensor.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Click to view details and moisture
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <AddSensorModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddSensor={handleAddSensor}
          />
        </div>
      </div>
    </AuthHandler>
  );
}
