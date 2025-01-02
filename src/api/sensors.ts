import { env } from "~/env";
import { getToken, getUserId } from "~/utils/localStore";

export type Sensor = {
  id?: string;
  name: string;
  location: string;
  plantType: Plant;
  status: string;
  ownedBy: string;
};
type SensorRaw = {
  id?: {
    $oid: string;
  };
  _id?: {
    $oid: string;
  };
  name: string;
  location: string;
  plantType: Plant;
  status: string;
  ownedBy: string;
};

export type SensorData = {
  timestamp: string;
  moistureLevel: number;
  sensor_id: string;
};

export type Plant = "succulent" | "house" | "fern";

const formatSensor = (sensor: SensorRaw): Sensor => ({
  id: sensor.id ? sensor.id.$oid : sensor._id?.$oid,
  name: sensor.name,
  location: sensor.location,
  plantType: sensor.plantType,
  status: sensor.status,
  ownedBy: sensor.ownedBy,
});

const formatSensorData = (data: SensorData): SensorData => {
  return {
    ...data,
    timestamp: new Date(data.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
};

export const getUserSensors = async (userId: string): Promise<Sensor[]> => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/users/${userId}/sensors`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          client_id: env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: SensorRaw[] = await response.json();
      return json.map(formatSensor);
    }

    return [];
  } catch {
    return [];
  }
};

export const getSensor = async (sensorId: string): Promise<Sensor | null> => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/sensors/${sensorId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          client_id: env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: SensorRaw = await response.json();
      return formatSensor(json);
    }

    return null;
  } catch {
    return null;
  }
};

export const addSensor = async (
  name: string,
  location: string,
  plantType: Plant,
): Promise<boolean> => {
  try {
    const body = {
      name,
      location,
      plantType,
      status: "Active",
      ownedBy: getUserId(),
    };

    await fetch(`${env.NEXT_PUBLIC_API_URL}/sensors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return true;
  } catch {
    return false;
  }
};

export const deleteSensor = async (sensorId: string): Promise<boolean> => {
  try {
    await fetch(`${env.NEXT_PUBLIC_API_URL}/sensors/${sensorId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
      },
    });
    return true;
  } catch {
    return false;
  }
};

//http://localhost:8081/api/sensors/123/history?limit=10&offset=0
export const getSensorData = async (
  sensorId: string,
  limit: number,
): Promise<SensorData[]> => {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/sensors/${sensorId}/history?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          client_id: env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        },
      },
    );
    if (res.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: SensorData[] = await res.json();
      return json.map(formatSensorData);
    }

    return [];
  } catch {
    return [];
  }
};
