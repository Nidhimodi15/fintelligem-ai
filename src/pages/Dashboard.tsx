import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import {
  FileText,
  AlertTriangle,
  Target,
  Users,
  Search,
  Bell,
  Menu,
  Zap,
  Upload,
  FileSearch,
  ShieldAlert,
  BarChart3,
  FileSpreadsheet,
  MessageSquare,
  Settings,
  Copy,
  BadgeAlert,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard", active: true },
    { icon: Upload, label: "Upload Invoices", path: "/upload" },
    { icon: FileSearch, label: "Invoice Explorer", path: "/explorer" },
    { icon: ShieldAlert, label: "Anomaly Center", path: "/anomalies" },
    { icon: Users, label: "Vendor Analytics", path: "/vendors" },
    { icon: FileSpreadsheet, label: "Reports", path: "/reports" },
    { icon: MessageSquare, label: "Chat with FINTEL", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">FINTEL AI</span>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoice, vendor, GSTIN, date..."
                className="pl-10"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">FA</span>
                </div>
                <span className="hidden sm:inline">Finance Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0 lg:w-20"
          } transition-all duration-300 border-r bg-card overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={sidebarOpen ? "inline" : "hidden lg:hidden"}>
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Expense Anomaly & Compliance Overview
            </h1>
            <p className="text-muted-foreground">
              Powered by FINTEL AI — Your Financial Intelligence Agent
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Invoices Processed"
              value="12,540"
              icon={FileText}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Invoices Flagged for Review"
              value="248"
              icon={AlertTriangle}
              variant="warning"
              trend={{ value: 8.3, isPositive: false }}
            />
            <StatCard
              title="Average Extraction Accuracy"
              value="87.2%"
              icon={Target}
              variant="success"
              trend={{ value: 3.2, isPositive: true }}
            />
            <StatCard
              title="Active Vendors"
              value="1,230"
              icon={Users}
              trend={{ value: 5.1, isPositive: true }}
            />
          </div>

          {/* Risk Overview */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Anomaly Trend (Last 30 Days)
              </h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <TrendingUp className="h-16 w-16 mb-4 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Score</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--success))"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset="70"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-success">75</span>
                    <span className="text-sm text-muted-foreground">
                      Healthy
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Risk Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Top Risk Categories
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6 border-l-4 border-l-destructive hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <Copy className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Duplicates Detected</h4>
                    <p className="text-2xl font-bold mb-1">42</p>
                    <p className="text-sm text-muted-foreground">
                      Potential duplicate invoices
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-warning hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <BadgeAlert className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Invalid GST Numbers
                    </h4>
                    <p className="text-2xl font-bold mb-1">28</p>
                    <p className="text-sm text-muted-foreground">
                      Failed GST validation
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-warning hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Price Outliers</h4>
                    <p className="text-2xl font-bold mb-1">35</p>
                    <p className="text-sm text-muted-foreground">
                      Above market rate
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
