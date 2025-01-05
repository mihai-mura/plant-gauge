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
import { TreePalm } from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <Card className="w-full max-w-3xl flex flex-row overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          {/* Seção da Esquerda com o Ícone */}
          <div className="flex w-1/3 items-center justify-center bg-green-100 p-4">
            <TreePalm className="h-32 w-32 text-green-600" />
          </div>

          {/* Seção da Direita com o Formulário */}
          <div className="flex w-2/3 flex-col p-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-600">
                {isLogin ? "Login" : "Register"}
              </CardTitle>
              <CardDescription className="text-gray-600">
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
          </div>
        </Card>
      </div>
    </AuthHandler>
  );
}
