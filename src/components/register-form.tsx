"use client";

import { useState } from "react";
import { register } from "~/api/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface RegisterFormProps {
  onSubmit: () => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      return;
    }
    setIsLoading(true);
    setMessage(null);

    const res = await register(username, email, password, confirmPassword);
    setMessage(res);
    setIsLoading(false);

    if (res.type === "success") {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      props.onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">@username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 text-white hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
      {message && (
        <p
          className={`text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
