import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm FINTEL, your Financial Compliance Copilot. I can help you analyze invoices, review anomalies, and generate compliance reports. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "top 2 anomalies": "Based on recent analysis:\n\n1. **Duplicate Invoices**: 42 potential duplicates detected, primarily from ABC Traders and TechNova. Invoice INV-23109 shows 95% similarity with INV-23087.\n\n2. **Invalid GST Numbers**: 28 invoices with failed GST validation. TechNova Pvt Ltd has the highest count with 8 invalid GSTINs in the last 30 days.",
        "invalid gst": "I found 28 invoices with invalid GST numbers:\n\n• TechNova Pvt Ltd: 8 invoices\n• Metro Logistics: 5 invoices\n• Office Supplies Co: 4 invoices\n• Others: 11 invoices\n\nThe most recent case is INV-23110 from TechNova (₹1,25,500) dated 15-Oct-2025. Would you like me to generate a detailed report?",
        "accuracy": "Current extraction accuracy metrics:\n\n• **Average Accuracy**: 87.2%\n• **Top Performer**: Global Supplies Inc (97%)\n• **Needs Improvement**: TechNova Pvt Ltd (89%)\n\nAccuracy has improved by 3.2% compared to last month. The AI model is continuously learning from corrections.",
        "compare": "Comparison of ABC Traders vs XYZ Ltd:\n\n**ABC Traders**:\n• GST Compliance: 92%\n• Anomaly Count: 8\n• Risk Score: 0.52\n\n**XYZ Ltd**:\n• GST Compliance: 96%\n• Anomaly Count: 3\n• Risk Score: 0.21\n\nXYZ Ltd shows better compliance metrics overall.",
      };

      const lowerInput = input.toLowerCase();
      let responseText = "I understand your query. Here's what I found based on our database:\n\n";
      
      if (lowerInput.includes("anomal")) {
        responseText = responses["top 2 anomalies"];
      } else if (lowerInput.includes("gst") || lowerInput.includes("invalid")) {
        responseText = responses["invalid gst"];
      } else if (lowerInput.includes("accuracy")) {
        responseText = responses["accuracy"];
      } else if (lowerInput.includes("compare")) {
        responseText = responses["compare"];
      } else {
        responseText += "I can help you with:\n• Analyzing invoice anomalies\n• Reviewing vendor compliance\n• Checking extraction accuracy\n• Comparing vendor performance\n• Generating custom reports\n\nPlease ask me a specific question!";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Show me top 2 anomalies in duplicate invoices",
    "List invoices with invalid GST numbers",
    "What's the average extraction accuracy?",
    "Compare ABC Traders vs TechNova compliance",
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Chat with FINTEL</h1>
          <p className="text-muted-foreground">
            Your AI-powered Financial Compliance Copilot
          </p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-3xl ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block p-4 rounded-lg bg-muted">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse delay-100" />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask FINTEL anything about invoices, compliance, or vendors..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
