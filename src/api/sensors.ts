import { env } from "~/env";
import { getToken, getUserId } from "~/utils/localStore";

export type Sensor = {
  id?: string;
  name: string;
  location: string;
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
  status: string;
  ownedBy: string;
};

const formatSensor = (sensor: SensorRaw): Sensor => ({
  id: sensor.id ? sensor.id.$oid : sensor._id?.$oid,
  name: sensor.name,
  location: sensor.location,
  status: sensor.status,
  ownedBy: sensor.ownedBy,
});

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
): Promise<boolean> => {
  try {
    const body = {
      name,
      location,
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
