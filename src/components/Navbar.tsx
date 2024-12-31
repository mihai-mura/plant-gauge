"use client";
import { LogOut } from "lucide-react";
import { logout } from "~/api/auth";
import { Button } from "~/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#171717] p-4 shadow-lg">
      <h1 className="text-3xl font-bold text-green-400">Sensor Dashboard</h1>
      <Button
        className="bg-red-700 text-white hover:bg-red-600"
        onClick={() => logout()}
      >
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </nav>
  );
};

export default Navbar;
