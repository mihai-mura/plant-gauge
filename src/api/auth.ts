import { env } from "~/env";
import { removeToken, removeUserData, removeUserId } from "~/utils/localStore";

export const login = async (
  email: string,
  password: string,
): Promise<{
  token: string | null;
  text: string;
  type: "success" | "error";
}> => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      body: JSON.stringify({ email, password }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: { token: string } = await response.json();

    if (response.status === 200)
      return {
        token: json.token,
        text: "Logged in successfully",
        type: "success",
      };

    //TODO: Solve wrong code
    if (response.status === 400)
      return { token: null, text: "Invalid email or password", type: "error" };

    return { token: null, text: "An error occurred", type: "error" };
  } catch {
    return { token: null, text: "An error occurred", type: "error" };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<{
  text: string;
  type: "success" | "error";
}> => {
  try {
    if (password !== passwordConfirm)
      return { text: "Passwords don't match", type: "error" };
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 201)
      return { text: "Registered successfully", type: "success" };

    return { text: "An error occurred", type: "error" };
  } catch {
    return { text: "An error occurred", type: "error" };
  }
};

export const logout = () => {
  removeToken();
  removeUserId();
  removeUserData();
  window.location.href = "/";
};
