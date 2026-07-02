"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { formatNairaCompact } from "@/lib/utils";
import { currencies } from "@/features/landing/data";

const SHARE_PRICE = 50_000;
const MIN_AMOUNT = 500;
const MAX_AMOUNT = 20_000;
const STEP = 100;

export function CurrencyConverter() {
  const [currencyCode, setCurrencyCode] = useState<(typeof currencies)[number]["code"]>("GBP");
  const [amount, setAmount] = useState(5_000);

  const currency = currencies.find((c) => c.code === currencyCode) ?? currencies[0];
  const nairaAmount = amount * currency.nairaRate;
  const shares = Math.floor(nairaAmount / SHARE_PRICE);

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg shadow-foreground/5">
      <h3 className="font-semibold text-foreground">Currency converter</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        See how many shares your money buys today.
      </p>

      <Tabs
        value={currencyCode}
        onValueChange={(value) => setCurrencyCode(value as typeof currencyCode)}
        className="mt-5"
      >
        <TabsList className="w-full bg-background">
          {currencies.map((c) => (
            <TabsTrigger key={c.code} value={c.code} className="flex-1">
              {c.code}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            You invest
          </p>
          <p className="text-lg font-semibold text-foreground">
            {currency.symbol}
            {amount.toLocaleString("en-NG")}
          </p>
        </div>
        <Slider
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={STEP}
          value={[amount]}
          onValueChange={([value]) => setAmount(value)}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">In naira</p>
        <p className="font-semibold text-foreground">{formatNairaCompact(nairaAmount)}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Shares at ₦50,000</p>
        <p className="font-semibold text-success">{shares} shares</p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Indicative rate {currency.symbol}1 = {formatNairaCompact(currency.nairaRate)}. USDC
        accepted at checkout.
      </p>
    </div>
  );
}
