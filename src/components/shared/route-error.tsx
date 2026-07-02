"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RouteError({ reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="shadow-soft flex flex-col items-center justify-center gap-4 rounded-2xl bg-card py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <AlertTriangle className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="font-medium text-foreground">Something went wrong</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please try again, or refresh the page.
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
