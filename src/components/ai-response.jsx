"use client";

import { CheckCircle2, Copy, Terminal, FileInput, FileOutput, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AIResponse({ result, status = "completed" }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  // Handle both direct ai_response and nested structure
  const ai_response = result.ai_response || result;
  
  if (!ai_response || (!ai_response.linux_command && !ai_response.description)) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <p>AI is processing your request...</p>
        </div>
      </div>
    );
  }

  const { linux_command, input_files, output_files, description } = ai_response;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linux_command || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        {status === "completed" && (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">AI Processing Complete</span>
          </>
        )}
        {status === "processing" && (
          <>
            <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            <span className="text-sm font-medium text-primary">Processing...</span>
          </>
        )}
        {status === "failed" && (
          <>
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-500">Processing Failed</span>
          </>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">What this does:</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}

      {/* Linux Command */}
      {linux_command && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Command to Execute:</h3>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="relative">
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono">
              <code>{linux_command}</code>
            </pre>
          </div>

          <div className="text-xs text-muted-foreground">
            💡 Copy this command and run it in your terminal
          </div>
        </div>
      )}

      {/* Input and Output Files */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input Files */}
        {input_files && input_files.length > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileInput className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Input Files:</h3>
            </div>
            <div className="space-y-2">
              {input_files.map((file, index) => (
                <div
                  key={index}
                  className="text-sm p-2 rounded bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
                >
                  📄 {file}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output Files */}
        {output_files && output_files.length > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileOutput className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Output Files:</h3>
            </div>
            <div className="space-y-2">
              {output_files.map((file, index) => {
                const fileName = typeof file === 'string' ? file : file.filename || file.name || 'Generated file';
                const isFileObject = typeof file === 'object' && file.filename;
                
                return (
                  <div
                    key={index}
                    className="text-sm p-2 rounded bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 flex items-center justify-between"
                  >
                    <span>📁 {fileName}</span>
                    {isFileObject && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Get user ID from localStorage or context
                          const userId = localStorage.getItem('user_id') || 'test-user';
                          const downloadUrl = `http://localhost:8000/files/${userId}/${fileName}`;
                          window.open(downloadUrl, '_blank');
                        }}
                        className="gap-1 h-7 px-2 text-xs"
                      >
                        📥 Download
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}