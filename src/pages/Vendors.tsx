import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  totalInvoices: number;
  totalSpend: string;
  avgAccuracy: number;
  riskScore: number;
  anomalyCount: number;
  lastAnomaly: string;
  trend: "up" | "down" | "stable";
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "TechNova Pvt Ltd",
    totalInvoices: 45,
    totalSpend: "₹45,50,000",
    avgAccuracy: 89,
    riskScore: 0.83,
    anomalyCount: 12,
    lastAnomaly: "2 days ago",
    trend: "up",
  },
  {
    id: "2",
    name: "ABC Traders",
    totalInvoices: 78,
    totalSpend: "₹32,40,000",
    avgAccuracy: 94,
    riskScore: 0.52,
    anomalyCount: 8,
    lastAnomaly: "5 days ago",
    trend: "down",
  },
  {
    id: "3",
    name: "Global Supplies Inc",
    totalInvoices: 124,
    totalSpend: "₹87,90,000",
    avgAccuracy: 97,
    riskScore: 0.12,
    anomalyCount: 2,
    lastAnomaly: "3 weeks ago",
    trend: "stable",
  },
  {
    id: "4",
    name: "Metro Logistics",
    totalInvoices: 56,
    totalSpend: "₹28,70,000",
    avgAccuracy: 91,
    riskScore: 0.35,
    anomalyCount: 5,
    lastAnomaly: "1 week ago",
    trend: "down",
  },
  {
    id: "5",
    name: "Office Supplies Co",
    totalInvoices: 92,
    totalSpend: "₹15,80,000",
    avgAccuracy: 96,
    riskScore: 0.18,
    anomalyCount: 3,
    lastAnomaly: "2 weeks ago",
    trend: "stable",
  },
];

const Vendors = () => {
  const getRiskBadge = (score: number) => {
    if (score >= 0.7) {
      return <Badge variant="destructive">High Risk</Badge>;
    } else if (score >= 0.4) {
      return <Badge variant="secondary">Medium Risk</Badge>;
    } else {
      return <Badge variant="outline" className="border-success text-success">Low Risk</Badge>;
    }
  };

  const getTrendIcon = (trend: Vendor["trend"]) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-success" />;
    return <div className="h-4 w-4" />;
  };

  const totalSpend = mockVendors.reduce((acc, v) => {
    const amount = parseInt(v.totalSpend.replace(/[₹,]/g, ""));
    return acc + amount;
  }, 0);

  const avgAccuracy = Math.round(
    mockVendors.reduce((acc, v) => acc + v.avgAccuracy, 0) / mockVendors.length
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vendor Analytics</h1>
          <p className="text-muted-foreground">
            Monitor vendor performance, spending patterns, and compliance trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Vendors</p>
            <p className="text-3xl font-bold">{mockVendors.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Spend</p>
            <p className="text-3xl font-bold">₹{(totalSpend / 10000000).toFixed(2)}Cr</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Avg Accuracy</p>
            <p className="text-3xl font-bold">{avgAccuracy}%</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">High Risk Vendors</p>
            <p className="text-3xl font-bold text-destructive">
              {mockVendors.filter((v) => v.riskScore >= 0.7).length}
            </p>
          </Card>
        </div>

        {/* Spending Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Vendor Spending Distribution</h3>
          <div className="space-y-4">
            {mockVendors.map((vendor) => {
              const spendAmount = parseInt(vendor.totalSpend.replace(/[₹,]/g, ""));
              const percentage = Math.round((spendAmount / totalSpend) * 100);
              return (
                <div key={vendor.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{vendor.name}</span>
                    <span className="text-muted-foreground">{vendor.totalSpend} ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Vendor Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Vendor Performance</h3>
            <Button variant="outline">Export Report</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Total Invoices</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Avg Accuracy</TableHead>
                <TableHead>Anomalies</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Risk Status</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVendors.map((vendor) => (
                <TableRow key={vendor.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.totalInvoices}</TableCell>
                  <TableCell className="font-semibold">{vendor.totalSpend}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{vendor.avgAccuracy}%</span>
                      {vendor.avgAccuracy >= 95 ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : vendor.avgAccuracy < 90 ? (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold">{vendor.anomalyCount}</div>
                      <div className="text-xs text-muted-foreground">{vendor.lastAnomaly}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${
                      vendor.riskScore >= 0.7 ? "text-destructive" :
                      vendor.riskScore >= 0.4 ? "text-warning" : "text-success"
                    }`}>
                      {vendor.riskScore.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{getRiskBadge(vendor.riskScore)}</TableCell>
                  <TableCell>{getTrendIcon(vendor.trend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Vendors;
