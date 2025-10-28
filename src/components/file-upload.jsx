"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Image, Video, Music, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getFileIcon = (fileType) => {
  if (fileType.startsWith("image/")) return <Image className="h-5 w-5" />;
  if (fileType.startsWith("video/")) return <Video className="h-5 w-5" />;
  if (fileType.startsWith("audio/")) return <Music className="h-5 w-5" />;
  if (fileType.includes("pdf") || fileType.includes("document"))
    return <FileText className="h-5 w-5" />;
  return <File className="h-5 w-5" />;
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export function FileUpload({ onUpload, isUploading = false }) {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log("📁 Files dropped:", droppedFiles);
    setFiles((prev) => {
      const newFiles = [...prev, ...droppedFiles];
      console.log("📁 Updated files list:", newFiles);
      return newFiles;
    });
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log("📁 Files selected:", selectedFiles);
    setFiles((prev) => {
      const newFiles = [...prev, ...selectedFiles];
      console.log("📁 Updated files list:", newFiles);
      return newFiles;
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    if (!prompt.trim()) {
      alert("Please enter a prompt describing what you want to do");
      return;
    }

    await onUpload(files, prompt);

    // Reset form after successful upload
    setFiles([]);
    setPrompt("");
  };

  return (
    <div className="w-full space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-lg border-2 border-dashed p-8
          transition-colors duration-200
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 bg-muted/20"
          }
          ${isUploading ? "pointer-events-none opacity-50" : "cursor-pointer"}
        `}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <Upload
            className={`h-12 w-12 mb-4 ${
              isDragging ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? "Drop files here" : "Upload Files"}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports images, videos, audio, PDFs, and documents
          </p>
        </div>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">✓</span>
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-muted-foreground">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            What do you want to do with {files.length > 0 ? "these files" : "your files"}?
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'Extract audio from this video' or 'Resize these images to 800x600' or 'Merge these PDFs into one file'"
            className="w-full min-h-[100px] p-3 rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isUploading}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isUploading || files.length === 0 || !prompt.trim()}
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload and Process
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
