"use client";
import { Activity, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PlantHealthChipProps {
  plantType: string;
  moistureLevel: number | null | undefined;
  className?: string;
}

const getHealthStatus = (
  moistureLevel: number | null,
): { status: string; color: string } => {
  if (moistureLevel === null) {
    return { status: "Unknown", color: "bg-gray-500" };
  } else if (moistureLevel < 20) {
    return { status: "Danger", color: "bg-red-500" };
  } else if (moistureLevel < 50) {
    return { status: "OK", color: "bg-yellow-500" };
  } else {
    return { status: "Good", color: "bg-green-500" };
  }
};

const PlantHealthChip: React.FC<PlantHealthChipProps> = ({
  moistureLevel,
  className,
}) => {
  const { status, color } = getHealthStatus(moistureLevel ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moistureLevel !== undefined) {
      setLoading(false);
    }
  }, [moistureLevel]);

  return (
    <div
      className={`${className} w-30 inline-flex h-8 items-center gap-2 rounded-full px-3 py-1 text-white ${color}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Activity className="h-4 w-4" />
      )}
      <span>{status}</span>
    </div>
  );
};

export default PlantHealthChip;
