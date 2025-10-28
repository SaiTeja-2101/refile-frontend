"use client";

import { motion } from "framer-motion";
import { Paperclip, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const features = [
    "File Conversion",
    "Smart Extract",
    "AI Summary",
    "APIs",
    "Retail Data",
    "Mobility Reports",
  ];

  return (
    <div 
      className="relative min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Subtle gradient glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,128,128,0.05),transparent_50%)]" />
      
      <Navbar />

      <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
        {/* Center Content */}
        <div className="w-full max-w-4xl space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--foreground)' }}
            >
              <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <h1 className="text-5xl font-bold md:text-6xl" style={{ color: 'var(--foreground)' }}>ReFile</h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div 
              className="group relative flex items-center rounded-full p-3 shadow-2xl backdrop-blur-sm transition-all hover:shadow-lg"
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
              }}
            >
              {/* File Upload Button */}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-10 w-10 hover:bg-transparent"
                style={{ color: 'var(--muted-foreground)' }}
                aria-label="Attach file"
                onClick={() => document.getElementById('file-input').click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <input
                id="file-input"
                type="file"
                className="hidden"
                multiple
              />

              {/* Input */}
              <Input
                type="text"
                placeholder="What do you want to convert?"
                className="h-12 flex-1 border-0 bg-transparent px-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ 
                  color: 'var(--foreground)',
                }}
              />

              {/* Submit Button */}
              <Button
                size="icon"
                className="h-12 w-12 rounded-full"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className="group relative rounded-full px-5 py-2 text-sm transition-all hover:shadow-lg"
                  style={{
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--secondary-foreground)'
                  }}
                >
                  {feature}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center text-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            By using ReFile, you agree to our{" "}
            <a href="#" className="underline transition-colors" style={{ color: 'var(--muted-foreground)' }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline transition-colors" style={{ color: 'var(--muted-foreground)' }}>
              Privacy Policy
            </a>
            .
          </motion.p>
        </div>
      </main>
    </div>
  );
}
