import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/stat-card";
import {
  FileText,
  AlertTriangle,
  Target,
  Users,
  Copy,
  BadgeAlert,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
