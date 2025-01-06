"use client";

import { PlusCircle, Shrub, Sprout, TreePalm } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addSensor,
  getSensorData,
  getUserSensors,
  type Plant,
  type Sensor,
} from "~/api/sensors";
import { AddSensorModal } from "~/components/AddSensorModal";
import AuthHandler from "~/components/AuthHandler";
import PlantHealthChip from "~/components/PlantHealthChip";
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
  const [lastMoistureReadings, setLastMoistureReadings] = useState<
    (number | null)[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca sensores do usuário ao carregar a página
  useEffect(() => {
    const fetchSensors = async () => {
      const userId = getUserId();
      if (userId) {
        setSensors(await getUserSensors(userId));
      }
    };

    fetchSensors();
  }, []);

  useEffect(() => {
    const fetchSensorLastData = async () => {
      const moistureReadings = await Promise.all(
        sensors.map(async (sensor) => {
          const data = await getSensorData(sensor.id ?? "", 1);
          return data[0]?.moistureLevel ?? null;
        }),
      );
      setLastMoistureReadings(moistureReadings);
    };

    fetchSensorLastData();
  }, [sensors]);

  // Função para adicionar novo sensor
  const handleAddSensor = async (
    name: string,
    location: string,
    plantType: Plant,
  ) => {
    const res = await addSensor(name, location, plantType);
    if (res) {
      setSensors(await getUserSensors(getUserId()!));
    }
  };

  return (
    <AuthHandler type="private">
      {/* Container principal */}
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* Conteúdo principal */}
        <div className="container mx-auto p-6 pt-10">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-600">
              Plant Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Manage your sensors and monitor your plants with ease.
            </p>
          </header>

          {/* Título e botão de adicionar sensor */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-green-600">
              Sensors ({sensors.length})
            </h2>
            <Button
              className="flex transform items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-transform hover:bg-green-500 active:scale-95"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle className="h-5 w-5" /> Add New Sensor
            </Button>
          </div>

          {/* Lista de sensores */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sensors.map((sensor, index) => (
              <Link href={`/dashboard/sensors/${sensor.id}`} key={sensor.id}>
                <Card className="transform border border-gray-300 bg-white shadow-md transition-transform ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 p-4">
                    {sensor.plantType === "succulent" && (
                      <Shrub className="text-5xl text-green-500" />
                    )}
                    {sensor.plantType === "house" && (
                      <Sprout className="text-5xl text-green-500" />
                    )}
                    {sensor.plantType === "fern" && (
                      <TreePalm className="text-5xl text-green-500" />
                    )}
                    <div>
                      <CardTitle className="text-green-700">
                        {sensor.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {sensor.location}
                      </CardDescription>
                    </div>
                    <PlantHealthChip
                      className="ml-auto"
                      moistureLevel={lastMoistureReadings[index]}
                      plantType={sensor.plantType}
                    />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Click to view details and monitor moisture levels.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Modal de adicionar sensor */}
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
