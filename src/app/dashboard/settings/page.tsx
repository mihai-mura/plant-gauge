"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { updateUser } from "~/api/users";
import AuthHandler from "~/components/AuthHandler";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getUserData, getUserId, storeUserData } from "~/utils/localStore";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(getUserData().username ?? "");
    setEmail(getUserData().email ?? "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateUser(getUserId() ?? "", username, email, password);
    setLoading(false);
    if (res) {
      setLoading(false);
      setPassword("");
      storeUserData(username, email);
    }
  };

  return (
    <AuthHandler type="private">
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-20">
        <Card className="min-w-[40rem] max-w-5xl rounded-lg border border-gray-300 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-600">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthHandler>
  );
};

export default Settings;
