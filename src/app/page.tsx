"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUser } from "~/api/users";
import AuthHandler from "~/components/AuthHandler";
import LoginForm from "~/components/login-form";
import RegisterForm from "~/components/register-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getIdFromToken } from "~/utils/jwt";
import { storeToken, storeUserData, storeUserId } from "~/utils/localStore";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const registerOnSubmit = () => {
    setIsLogin(true);
  };

  const loginOnSubmit = async (token: string) => {
    const userId = getIdFromToken(token);
    const user = await getUser(userId);

    storeToken(token);
    storeUserId(userId);
    storeUserData(user.username, user.email);

    router.push("/dashboard");
  };

  return (
    <AuthHandler type="public">
      <div
        className={`dark flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-gray-900`}
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-green-600">
                {isLogin ? "Login" : "Register"}
              </CardTitle>
            </div>
            <CardDescription>
              Welcome to PlantGauge. Keep your plants happy!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <LoginForm onSubmit={loginOnSubmit} />
            ) : (
              <RegisterForm onSubmit={registerOnSubmit} />
            )}
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthHandler>
  );
}
