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
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="container mx-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-green-600 hover:text-green-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Plant
            </Button>
          </div>

          <Card className="dark">
            <CardHeader className="flex flex-row items-center gap-5">
              {sensor.plantType === "succulent" && (
                <Shrub className="text-4xl text-slate-300" />
              )}
              {sensor.plantType === "house" && (
                <Sprout className="text-4xl text-slate-300" />
              )}
              {sensor.plantType === "fern" && (
                <TreePalm className="text-4xl text-slate-300" />
              )}
              <div>
                <CardTitle>{sensor.name}</CardTitle>
                <CardDescription>
                  {capitalizeFirstLetter(sensor.plantType)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <MoistureChart chartData={chartData} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Average moisture level:{" "}
                {calculateMean(chartData.map((data) => data.moistureLevel))}%{" "}
                <TrendingDown className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing last 20 readings
              </div>
            </CardFooter>
          </Card>

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
