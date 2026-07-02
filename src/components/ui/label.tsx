import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium tracking-[-0.01em] text-foreground", className)}
      {...props}
    />
  );
}
