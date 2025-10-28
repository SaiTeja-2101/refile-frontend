"use client";

import { motion } from "framer-motion";
import { Upload, ArrowRight, ChevronDown } from "lucide-react";
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
    <div className="relative min-h-screen bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#1a1a1a] dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#1a1a1a]">
      {/* Subtle gradient glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
      
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
              className="text-white"
            >
              <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <h1 className="text-5xl font-bold text-white md:text-6xl">ReFile</h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="group relative flex items-center rounded-full border border-white/10 bg-[#1a1a1a]/80 p-3 shadow-2xl backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {/* Upload Icon */}
              <Upload className="ml-2 h-5 w-5 text-gray-400" />

              {/* Input */}
              <Input
                type="text"
                placeholder="What do you want to convert?"
                className="h-12 flex-1 border-0 bg-transparent px-4 text-base text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* Auto Dropdown (fake) */}
              <div className="mr-2 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                <span>Auto</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* Submit Button */}
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90"
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
                  className="group relative rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
            className="mt-12 text-center text-sm text-gray-500"
          >
            By using ReFile, you agree to our{" "}
            <a href="#" className="text-gray-400 underline hover:text-gray-300">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-400 underline hover:text-gray-300">
              Privacy Policy
            </a>
            .
          </motion.p>
        </div>
      </main>
    </div>
  );
}
