import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Zap, ShieldCheck, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <Zap className="h-12 w-12" />
              FINTEL AI
            </h1>
            <p className="text-2xl font-light mb-2">
              Your Autonomous Finance & Compliance Agent
            </p>
            <p className="text-xl opacity-90">Automate. Audit. Assure.</p>
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  AI-Powered Compliance
                </h3>
                <p className="opacity-90">
                  Detect anomalies with 87%+ accuracy using advanced ML models
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TrendingUp className="h-8 w-8 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Real-time Analytics
                </h3>
                <p className="opacity-90">
                  Monitor vendor risk, compliance trends, and audit trails
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              FINTEL AI
            </h1>
            <p className="text-muted-foreground">Finance Intelligence Agent</p>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Employee ID</Label>
              <Input
                id="email"
                type="text"
                placeholder="your.email@adani.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              Continue with SSO
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Powered by Adani Finance × AI
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
