"use client";
import { LogOut, User } from "lucide-react"; // Import User icon
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "~/api/auth";
import { Button } from "~/components/ui/button";
import { getUserData } from "~/utils/localStore";

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(getUserData().username ?? "");
  }, []);

  return (
    <nav className="flex items-center justify-between bg-[#171717] p-4 shadow-lg">
      <h1 className="text-3xl font-bold text-green-600">Plant Dashboard</h1>
      <div className="flex items-center">
        <Button
          className="mr-2 text-white hover:bg-transparent hover:text-green-600"
          variant={"ghost"}
          onClick={() => router.push("/dashboard/settings")}
        >
          <User className="h-4 w-4" /> @{username}
        </Button>
        <Button
          className="bg-red-700 text-white hover:bg-red-600"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
