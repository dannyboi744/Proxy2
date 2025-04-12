import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

export interface LogEntry {
  id: number;
  timestamp: string;
  type: "request" | "response" | "info";
  message: string;
  details?: Record<string, any>;
}

interface InteractionLogsProps {
  logs: LogEntry[];
  isVisible: boolean;
}

export default function InteractionLogs({ logs, isVisible }: InteractionLogsProps) {
  if (!isVisible || logs.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6 border border-slate-200">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-slate-900">Debug: Interaction Logs</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>
      <ScrollArea className="h-64">
        <div className="p-4 space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
              <div className="flex justify-between text-xs mb-1">
                <span 
                  className={`font-medium ${
                    log.type === "request" 
                      ? "text-blue-600" 
                      : log.type === "response" 
                        ? "text-green-600" 
                        : "text-slate-600"
                  }`}
                >
                  {log.type.toUpperCase()}
                </span>
                <span className="text-slate-400">{log.timestamp}</span>
              </div>
              <p className="text-sm text-slate-800">{log.message}</p>
              {log.details && (
                <pre className="mt-1 p-2 bg-slate-50 rounded text-xs text-slate-700 overflow-x-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}