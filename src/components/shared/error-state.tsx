"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  onRetry,
  message = "Couldn't load this data.",
}: {
  onRetry: () => void;
  message?: string;
}) {
  return (
    <div className="shadow-soft flex flex-col items-center justify-center gap-3 rounded-2xl bg-card py-12 text-center">
      <AlertTriangle className="h-6 w-6 text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button size="sm" variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
