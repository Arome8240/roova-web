"use client";

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
};

export function ChartTooltip({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatValue?: (value: number | string) => string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="shadow-soft rounded-xl bg-card px-3 py-2 text-sm">
      {label && <p className="font-medium text-foreground">{label}</p>}
      <div className="mt-1 space-y-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
            <span>
              {formatValue && item.value !== undefined ? formatValue(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
