"use client";

import { useState } from "react";
import { login } from "~/api/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface LoginFormProps {
  onSubmit: (token: string) => Promise<void>;
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const res = await login(email, password);
    setMessage(res);
    setIsLoading(false);

    if (res.type === "success" && res.token) await props.onSubmit(res.token);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-600">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-lg bg-green-600 px-4 py-2 text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      {message && (
        <p
          className={`text-center ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
