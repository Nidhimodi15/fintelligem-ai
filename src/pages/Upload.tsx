import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  uploadTime: string;
  status: "processing" | "completed" | "error";
  accuracy: number;
  progress: number;
}

const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Invoice_ABC_Traders_Oct2025.pdf",
      uploadTime: "2 mins ago",
      status: "completed",
      accuracy: 94,
      progress: 100,
    },
    {
      id: "2",
      name: "TechNova_INV_23109.pdf",
      uploadTime: "5 mins ago",
      status: "processing",
      accuracy: 0,
      progress: 65,
    },
  ]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (uploadedFiles: File[]) => {
    const newFiles: UploadedFile[] = uploadedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      uploadTime: "Just now",
      status: "processing",
      accuracy: 0,
      progress: 0,
    }));

    setFiles([...newFiles, ...files]);
    toast.success(`${uploadedFiles.length} file(s) uploaded successfully`);

    // Simulate processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, progress: 100, status: "completed", accuracy: 85 + Math.floor(Math.random() * 10) }
              : f
          )
        );
      }, 2000 + index * 500);
    });
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "processing":
        return <Clock className="h-5 w-5 text-warning animate-spin" />;
    }
  };

  const getStatusText = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "error":
        return "Error";
      case "processing":
        return "Processing";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Invoices</h1>
          <p className="text-muted-foreground">
            Upload PDF, PNG, or JPEG invoices for AI-powered extraction and compliance validation
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="p-12 border-2 border-dashed hover:border-primary transition-colors">
          <div
            className="flex flex-col items-center justify-center space-y-4"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="p-6 rounded-full bg-primary/10">
              <UploadIcon className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                Drop invoices here or click to browse
              </h3>
              <p className="text-sm text-muted-foreground">
                Supports PDF, PNG, JPEG • Max 20MB per file
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              id="file-upload"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </Card>

        {/* Auto-sync Options */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Auto-Sync Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Email Inbox Integration</p>
                <p className="text-sm text-muted-foreground">
                  Automatically import invoices from finance@adani.com
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Shared Drive Sync</p>
                <p className="text-sm text-muted-foreground">
                  Monitor Google Drive folder for new invoices
                </p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </Card>

        {/* Upload History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <FileText className="h-10 w-10 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground">
                      {file.uploadTime}
                    </span>
                    {file.status === "processing" && (
                      <div className="flex-1 max-w-xs">
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {file.status === "completed" && (
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {file.accuracy}% Accuracy
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(file.status)}
                    <span className="text-sm font-medium">
                      {getStatusText(file.status)}
                    </span>
                  </div>
                  {file.status === "completed" && (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
