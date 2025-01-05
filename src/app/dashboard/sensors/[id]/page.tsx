"use client";

import {
  ArrowLeft,
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
  type Sensor,
  type SensorData,
} from "~/api/sensors";
import AuthHandler from "~/components/AuthHandler";
import { ConfirmDeleteModal } from "~/components/ConfirmDeleteModal";
import FullPageLoader from "~/components/FullPageLoader";
import { MoistureChart } from "~/components/MoistureChart";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateMean = (data: number[]): string => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  const mean = sum / data.length;
  return mean.toFixed(2);
};

export default function SensorDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chartData, setChartData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchSensor = async () => {
      if (id) {
        const res = await getSensor(id as string);
        setSensor(res);
        const chartData = await getSensorData(id as string, 20);
        setChartData(chartData);
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
    <AuthHandler type="private">
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="container mx-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            {/* Botão Voltar */}
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-green-600 hover:bg-green-500"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
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
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {sensor.name}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {capitalizeFirstLetter(sensor.plantType)}
                </CardDescription>
              </div>
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
              <div>Showing last 20 readings</div>
            </CardFooter>
          </Card>

          {/* Modal de Confirmação */}
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteSensor}
            sensorName={sensor.name}
          />
        </div>
      </div>
    </AuthHandler>
  );
}
