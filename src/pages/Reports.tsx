import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  description: string;
  type: "summary" | "detailed" | "audit";
  period: string;
  generatedDate: string;
  status: "ready" | "generating";
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Compliance Summary - October 2025",
    description: "Overview of all compliance checks, anomalies, and vendor risk scores",
    type: "summary",
    period: "Oct 2025",
    generatedDate: "25-Oct-2025",
    status: "ready",
  },
  {
    id: "2",
    title: "Detailed Anomaly Report - Q3 2025",
    description: "Comprehensive analysis of all detected anomalies with remediation recommendations",
    type: "detailed",
    period: "Q3 2025",
    generatedDate: "20-Oct-2025",
    status: "ready",
  },
  {
    id: "3",
    title: "Vendor Audit Trail - September 2025",
    description: "Complete audit trail for all vendor transactions and compliance checks",
    type: "audit",
    period: "Sep 2025",
    generatedDate: "15-Oct-2025",
    status: "ready",
  },
  {
    id: "4",
    title: "Weekly Compliance Report",
    description: "Current week's compliance status and flagged invoices",
    type: "summary",
    period: "This Week",
    generatedDate: "Just now",
    status: "generating",
  },
];

const Reports = () => {
  const handleDownload = (format: string) => {
    toast.success(`Report downloaded as ${format.toUpperCase()}`);
  };

  const handleGenerate = () => {
    toast.success("Report generation started. You'll be notified when ready.");
  };

  const getReportIcon = (type: Report["type"]) => {
    return FileText;
  };

  const getTypeBadge = (type: Report["type"]) => {
    const labels = {
      summary: "Summary",
      detailed: "Detailed",
      audit: "Audit Trail",
    };
    return <Badge variant="outline">{labels[type]}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Generate and download compliance reports for audit and analysis
            </p>
          </div>
        </div>

        {/* Generate New Report */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Generate New Report</h3>
          <div className="grid gap-4 md:grid-cols-5">
            <Select defaultValue="summary">
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="audit">Audit Trail</SelectItem>
                <SelectItem value="vendor">Vendor Report</SelectItem>
                <SelectItem value="anomaly">Anomaly Report</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Vendors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vendors</SelectItem>
                <SelectItem value="high-risk">High Risk Only</SelectItem>
                <SelectItem value="select">Select Vendors</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2" onClick={handleGenerate}>
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </Card>

        {/* Key Insights */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Compliance Rate</p>
                <p className="text-2xl font-bold mb-1">94.3%</p>
                <p className="text-xs text-success">↑ 2.1% from last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-warning">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <FileText className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Flagged Invoices</p>
                <p className="text-2xl font-bold mb-1">248</p>
                <p className="text-xs text-muted-foreground">Out of 12,540 total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-success">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Resolved Issues</p>
                <p className="text-2xl font-bold mb-1">187</p>
                <p className="text-xs text-success">75.4% resolution rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {mockReports.map((report) => {
              const Icon = getReportIcon(report.type);
              return (
                <div
                  key={report.id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{report.title}</h4>
                      {getTypeBadge(report.type)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.period}
                      </span>
                      <span>Generated: {report.generatedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {report.status === "generating" ? (
                      <Badge variant="secondary" className="animate-pulse">
                        Generating...
                      </Badge>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleDownload("pdf")}
                        >
                          <Download className="h-4 w-4" />
                          PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload("xlsx")}
                        >
                          XLSX
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
