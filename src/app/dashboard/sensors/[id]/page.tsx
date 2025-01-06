"use client";

import {
  ArrowLeft,
  Pencil,
  Shrub,
  Sprout,
  Trash2,
  TreePalm,
  TrendingDown,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteSensor,
  getSensor,
  getSensorData,
  updateSensor,
  type Plant,
  type Sensor,
  type SensorData,
} from "~/api/sensors";
import AuthHandler from "~/components/AuthHandler";
import { ConfirmDeleteModal } from "~/components/ConfirmDeleteModal";
import EditPlantModal from "~/components/EditPlantModal";
import FullPageLoader from "~/components/FullPageLoader";
import { MoistureChart } from "~/components/MoistureChart";
import PlantHealthChip from "~/components/PlantHealthChip";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const DATA_READINGS = 15;

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateMean = (data: number[]): string => {
  if (data.length === 0) return "0.00";
  const sum = data.reduce((acc, value) => acc + value, 0);
  const mean = sum / data.length;
  return mean.toFixed(2);
};

export default function SensorDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [chartData, setChartData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchSensor = async () => {
      if (id) {
        const res = await getSensor(id as string);
        setSensor(res);
        const chartData = await getSensorData(id as string, DATA_READINGS);
        setChartData(chartData);
      }
    };

    fetchSensor();
  }, [id]);

  const handleDeleteSensor = async () => {
    const res = await deleteSensor(id as string);
    if (res) router.push("/dashboard");
  };

  const handleEditSensor = async (
    name: string,
    location: string,
    plantType: Plant,
  ) => {
    const res = await updateSensor(id as string, name, location, plantType);
    if (res) {
      setIsEditModalOpen(false);
      setSensor((prev) => {
        if (!prev) return prev;
        return { ...prev, name, location, plantType };
      });
    } else {
      setIsEditModalOpen(false);
    }
  };

  return !sensor ? (
    <FullPageLoader />
  ) : (
    <AuthHandler type="private">
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="container mx-auto p-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            {/* Botão Voltar */}
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-green-600 hover:bg-green-500"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Button>
            {/* Botão Deletar */}
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
              className="ml-auto flex items-center gap-2 text-green-600 hover:bg-green-500"
            >
              <Pencil className="h-5 w-5" />
              Edit Plant
            </Button>
            {/* Botão Deletar */}
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 text-red-600 hover:bg-red-500"
            >
              <Trash2 className="h-5 w-5" />
              Delete Plant
            </Button>
          </div>

          {/* Card Principal */}
          <Card className="rounded-lg border border-gray-300 bg-white shadow-md">
            <CardHeader className="flex items-center gap-4 p-6">
              {/* Ícone Baseado no Tipo de Planta */}
              {sensor.plantType === "succulent" && (
                <Shrub className="h-12 w-12 text-green-500" />
              )}
              {sensor.plantType === "house" && (
                <Sprout className="h-12 w-12 text-green-500" />
              )}
              {sensor.plantType === "fern" && (
                <TreePalm className="h-12 w-12 text-green-500" />
              )}
              <div className="flex flex-col items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {sensor.name}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {capitalizeFirstLetter(sensor.plantType)} - {sensor.location}
                </CardDescription>
              </div>
              <PlantHealthChip
                plantType={sensor.plantType}
                moistureLevel={
                  chartData[chartData.length - 1]?.moistureLevel ?? null
                }
              />
            </CardHeader>
            <CardContent>
              {/* Gráfico de Umidade */}
              <MoistureChart chartData={chartData} />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                Average moisture level:{" "}
                <span className="text-green-600">
                  {calculateMean(chartData.map((data) => data.moistureLevel))}%
                </span>
                <TrendingDown className="h-5 w-5 text-green-500" />
              </div>
              <div>Showing last {DATA_READINGS} readings</div>
            </CardFooter>
          </Card>

          {/* Modal de Confirmação */}
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteSensor}
            sensorName={sensor.name}
          />
          <EditPlantModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={handleEditSensor}
            sensorName={sensor.name}
            sensorLocation={sensor.location}
            plantType={sensor.plantType}
          />
        </div>
      </div>
    </AuthHandler>
  );
}
