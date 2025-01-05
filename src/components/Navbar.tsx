"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "~/api/auth";
import { getUserData } from "~/utils/localStore";

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(getUserData().username ?? "");
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-green-600 text-white shadow-md rounded-b-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Título da Navbar */}
        <h1 className="text-2xl font-bold">Plant Dashboard</h1>

        {/* Perfil e Logout */}
        <div className="flex items-center gap-6">
          {/* Informações de Perfil */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard/settings")}
          >
            <User className="h-6 w-6 text-white" />
            <span className="text-sm font-medium">Hi, {username}</span>
          </div>

          {/* Botão de Logout */}
          <button
            className="flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600 transition"
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
