export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const storeUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getUserId = (): string | null => {
  if (typeof window !== "undefined") return localStorage.getItem("userId");
  return null;
};

export const removeUserId = () => {
  localStorage.removeItem("userId");
};

export const storeUserData = (username: string, email: string) => {
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
};

export const getUserData = (): {
  username: string | null;
  email: string | null;
} => {
  if (typeof window !== "undefined")
    return {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
    };
  return {
    username: null,
    email: null,
  };
};

export const removeUserData = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};
