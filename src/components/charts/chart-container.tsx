"use client";

import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export function ChartContainer({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) {
  return (
    <div className={cn("h-72 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
