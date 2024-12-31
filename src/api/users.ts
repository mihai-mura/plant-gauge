import { env } from "~/env";
import { getToken } from "~/utils/localStore";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface UserRaw {
  _id: {
    $oid: string;
  };
  username: string;
  email: string;
}

const formatUser = (user: UserRaw): User => ({
  id: user._id.$oid,
  username: user.username,
  email: user.email,
});

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: UserRaw = await response.json();
      console.log(json);
      return formatUser(json);
    }
    return {} as User;
  } catch {
    return {} as User;
  }
};
