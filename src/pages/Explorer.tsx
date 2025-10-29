import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, Eye, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Invoice {
  id: string;
  invoiceNo: string;
  vendor: string;
  date: string;
  amount: string;
  gstinVendor: string;
  gstinCompany: string;
  accuracy: number;
  riskScore: number;
  flags: string[];
  status: "compliant" | "warning" | "error";
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-23109",
    vendor: "ABC Traders",
    date: "12-Oct-2025",
    amount: "₹54,980.00",
    gstinVendor: "27ABCDE1234F1Z5",
    gstinCompany: "29ADANI1234F1ZX",
    accuracy: 98,
    riskScore: 0.15,
    flags: ["Duplicate", "HSN Mismatch"],
    status: "warning",
  },
  {
    id: "2",
    invoiceNo: "INV-23110",
    vendor: "TechNova Pvt Ltd",
    date: "15-Oct-2025",
    amount: "₹1,25,500.00",
    gstinVendor: "24XYZAB5678G2W1",
    gstinCompany: "29ADANI1234F1ZX",
    accuracy: 94,
    riskScore: 0.72,
    flags: ["Invalid GST", "Price Outlier"],
    status: "error",
  },
  {
    id: "3",
    invoiceNo: "INV-23111",
    vendor: "Global Supplies Inc",
    date: "18-Oct-2025",
    amount: "₹89,200.00",
    gstinVendor: "27GLBSP9876F3Z8",
    gstinCompany: "29ADANI1234F1ZX",
    accuracy: 99,
    riskScore: 0.08,
    flags: [],
    status: "compliant",
  },
  {
    id: "4",
    invoiceNo: "INV-23112",
    vendor: "Metro Logistics",
    date: "20-Oct-2025",
    amount: "₹43,750.00",
    gstinVendor: "29METRO4321H1Y9",
    gstinCompany: "29ADANI1234F1ZX",
    accuracy: 91,
    riskScore: 0.35,
    flags: ["Arithmetic Error"],
    status: "warning",
  },
];

const Explorer = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: Invoice["status"]) => {
    const variants = {
      compliant: { variant: "default" as const, label: "Compliant", icon: CheckCircle },
      warning: { variant: "secondary" as const, label: "Warning", icon: AlertTriangle },
      error: { variant: "destructive" as const, label: "Error", icon: XCircle },
    };
    const config = variants[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getRiskColor = (score: number) => {
    if (score < 0.3) return "text-success";
    if (score < 0.6) return "text-warning";
    return "text-destructive";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Invoice Explorer</h1>
            <p className="text-muted-foreground">
              View and analyze all processed invoices
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.vendor}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="font-semibold">{invoice.amount}</TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{invoice.accuracy}%</span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-bold ${getRiskColor(invoice.riskScore)}`}>
                      {invoice.riskScore.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Invoice Details</SheetTitle>
            <SheetDescription>
              {selectedInvoice?.invoiceNo} • {selectedInvoice?.vendor}
            </SheetDescription>
          </SheetHeader>

          {selectedInvoice && (
            <Tabs defaultValue="extracted" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="extracted">Extracted Data</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="audit">Audit Trail</TabsTrigger>
              </TabsList>

              <TabsContent value="extracted" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Invoice Number</p>
                    <p className="font-medium">{selectedInvoice.invoiceNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Invoice Date</p>
                    <p className="font-medium">{selectedInvoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Invoice Amount</p>
                    <p className="font-medium text-lg">{selectedInvoice.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Extraction Accuracy</p>
                    <p className="font-medium">{selectedInvoice.accuracy}%</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Vendor GSTIN</p>
                    <p className="font-mono text-sm">{selectedInvoice.gstinVendor}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Company GSTIN</p>
                    <p className="font-mono text-sm">{selectedInvoice.gstinCompany}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4 mt-6">
                {selectedInvoice.flags.map((flag, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-warning">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">{flag}</h4>
                        <p className="text-sm text-muted-foreground">
                          This invoice has been flagged for manual review
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
                {selectedInvoice.flags.length === 0 && (
                  <Card className="p-6 border-l-4 border-l-success">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-success" />
                      <p className="font-medium">All compliance checks passed</p>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="audit" className="space-y-3 mt-6">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 bg-success rounded-full" />
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium mb-1">File Uploaded</p>
                      <p className="text-xs text-muted-foreground">by Finance Team • 10:20 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 bg-primary rounded-full" />
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium mb-1">Data Extracted</p>
                      <p className="text-xs text-muted-foreground">Accuracy: {selectedInvoice.accuracy}% • 10:21 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 bg-primary rounded-full" />
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium mb-1">GST Validated</p>
                      <p className="text-xs text-muted-foreground">10:22 AM</p>
                    </div>
                  </div>
                  {selectedInvoice.flags.length > 0 && (
                    <div className="flex gap-3">
                      <div className="w-2 bg-warning rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Anomalies Detected</p>
                        <p className="text-xs text-muted-foreground">10:23 AM</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default Explorer;
