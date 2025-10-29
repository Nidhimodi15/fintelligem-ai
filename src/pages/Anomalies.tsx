import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, BadgeAlert, TrendingUp, Calculator, DollarSign, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Anomaly {
  id: string;
  type: "duplicate" | "gst" | "hsn" | "arithmetic" | "price";
  vendor: string;
  invoiceNo: string;
  severity: "high" | "medium" | "low";
  description: string;
  amount: string;
  date: string;
}

const mockAnomalies: Anomaly[] = [
  {
    id: "1",
    type: "duplicate",
    vendor: "ABC Traders",
    invoiceNo: "INV-23109",
    severity: "high",
    description: "95% similarity with INV-23087",
    amount: "₹54,980.00",
    date: "12-Oct-2025",
  },
  {
    id: "2",
    type: "gst",
    vendor: "TechNova Pvt Ltd",
    invoiceNo: "INV-23110",
    severity: "high",
    description: "Invalid GSTIN format",
    amount: "₹1,25,500.00",
    date: "15-Oct-2025",
  },
  {
    id: "3",
    type: "hsn",
    vendor: "Metro Logistics",
    invoiceNo: "INV-23112",
    severity: "medium",
    description: "Billed 18% GST, expected 12% for HSN 998312",
    amount: "₹43,750.00",
    date: "20-Oct-2025",
  },
  {
    id: "4",
    type: "price",
    vendor: "TechNova Pvt Ltd",
    invoiceNo: "INV-23110",
    severity: "medium",
    description: "15% above average market rate for IT Consulting",
    amount: "₹1,25,500.00",
    date: "15-Oct-2025",
  },
  {
    id: "5",
    type: "arithmetic",
    vendor: "Office Supplies Co",
    invoiceNo: "INV-23113",
    severity: "low",
    description: "Line item totals don't match invoice total",
    amount: "₹28,450.00",
    date: "22-Oct-2025",
  },
];

const Anomalies = () => {
  const getAnomalyIcon = (type: Anomaly["type"]) => {
    const icons = {
      duplicate: Copy,
      gst: BadgeAlert,
      hsn: Shield,
      arithmetic: Calculator,
      price: DollarSign,
    };
    return icons[type];
  };

  const getAnomalyLabel = (type: Anomaly["type"]) => {
    const labels = {
      duplicate: "Duplicate Invoice",
      gst: "Invalid GST",
      hsn: "HSN Mismatch",
      arithmetic: "Arithmetic Error",
      price: "Price Outlier",
    };
    return labels[type];
  };

  const getSeverityBadge = (severity: Anomaly["severity"]) => {
    const variants = {
      high: "destructive" as const,
      medium: "secondary" as const,
      low: "outline" as const,
    };
    return (
      <Badge variant={variants[severity]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getAnomaliesByType = (type: Anomaly["type"]) => {
    return mockAnomalies.filter((a) => a.type === type);
  };

  const anomalyStats = [
    { type: "duplicate" as const, count: mockAnomalies.filter(a => a.type === "duplicate").length, label: "Duplicates" },
    { type: "gst" as const, count: mockAnomalies.filter(a => a.type === "gst").length, label: "Invalid GST" },
    { type: "hsn" as const, count: mockAnomalies.filter(a => a.type === "hsn").length, label: "HSN Mismatches" },
    { type: "price" as const, count: mockAnomalies.filter(a => a.type === "price").length, label: "Price Outliers" },
    { type: "arithmetic" as const, count: mockAnomalies.filter(a => a.type === "arithmetic").length, label: "Arithmetic Errors" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Anomaly & Compliance Center</h1>
          <p className="text-muted-foreground">
            Review and manage all flagged invoices requiring attention
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-5">
          {anomalyStats.map((stat) => {
            const Icon = getAnomalyIcon(stat.type);
            return (
              <Card key={stat.type} className="p-6 border-l-4 border-l-warning hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Icon className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Vendor Risk Heatmap */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Risky Vendors</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">TechNova Pvt Ltd</span>
                  <span className="text-sm text-destructive font-bold">Risk: 0.83</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: "83%" }} />
                </div>
              </div>
              <Badge variant="destructive">3 Anomalies</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">ABC Traders</span>
                  <span className="text-sm text-warning font-bold">Risk: 0.52</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: "52%" }} />
                </div>
              </div>
              <Badge variant="secondary">2 Anomalies</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Metro Logistics</span>
                  <span className="text-sm text-warning font-bold">Risk: 0.35</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: "35%" }} />
                </div>
              </div>
              <Badge variant="secondary">1 Anomaly</Badge>
            </div>
          </div>
        </Card>

        {/* Anomalies by Type */}
        <Card className="p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Anomalies</TabsTrigger>
              <TabsTrigger value="duplicate">Duplicates</TabsTrigger>
              <TabsTrigger value="gst">Invalid GST</TabsTrigger>
              <TabsTrigger value="hsn">HSN Mismatch</TabsTrigger>
              <TabsTrigger value="price">Price Outliers</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnomalies.map((anomaly) => {
                    const Icon = getAnomalyIcon(anomaly.type);
                    return (
                      <TableRow key={anomaly.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-warning" />
                            <span className="text-sm">{getAnomalyLabel(anomaly.type)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{anomaly.vendor}</TableCell>
                        <TableCell>{anomaly.invoiceNo}</TableCell>
                        <TableCell className="max-w-xs truncate">{anomaly.description}</TableCell>
                        <TableCell className="font-semibold">{anomaly.amount}</TableCell>
                        <TableCell>{getSeverityBadge(anomaly.severity)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Review</Button>
                            <Button size="sm" variant="ghost">Dismiss</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>

            {["duplicate", "gst", "hsn", "price"].map((type) => (
              <TabsContent key={type} value={type}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getAnomaliesByType(type as Anomaly["type"]).map((anomaly) => (
                      <TableRow key={anomaly.id}>
                        <TableCell className="font-medium">{anomaly.vendor}</TableCell>
                        <TableCell>{anomaly.invoiceNo}</TableCell>
                        <TableCell className="max-w-xs">{anomaly.description}</TableCell>
                        <TableCell className="font-semibold">{anomaly.amount}</TableCell>
                        <TableCell>{anomaly.date}</TableCell>
                        <TableCell>{getSeverityBadge(anomaly.severity)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Review</Button>
                            <Button size="sm" variant="ghost">Dismiss</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Anomalies;
