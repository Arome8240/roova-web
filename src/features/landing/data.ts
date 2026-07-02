export type Property = {
  location: string;
  title: string;
  developer: string;
  tier: string;
  yieldPct: number;
  raised: number;
  target: number;
  investors: number;
  daysRemaining: number;
  sharePrice: number;
  editorsPick?: boolean;
};

export const heroProperty: Property = {
  location: "Victoria Island, Lagos",
  title: "Eko Atlantic Skyline Tower",
  developer: "Sterling Heights Realty",
  tier: "Gold tier",
  yieldPct: 14.2,
  raised: 391_500_000,
  target: 450_000_000,
  investors: 39,
  daysRemaining: 4,
  sharePrice: 50_000,
  editorsPick: true,
};

export const featuredProperties: Property[] = [
  {
    location: "Lekki, Lagos",
    title: "Lekki Phase 1 Residences",
    developer: "Adunni Properties",
    tier: "Gold tier",
    yieldPct: 11.8,
    raised: 182_000_000,
    target: 240_000_000,
    investors: 64,
    daysRemaining: 9,
    sharePrice: 50_000,
  },
  {
    location: "Maitama, Abuja",
    title: "Maitama Garden Court",
    developer: "Capital Estates Ltd",
    tier: "Silver tier",
    yieldPct: 9.6,
    raised: 98_000_000,
    target: 150_000_000,
    investors: 41,
    daysRemaining: 18,
    sharePrice: 50_000,
  },
  {
    location: "Ikoyi, Lagos",
    title: "Ikoyi Waterfront Lofts",
    developer: "Sterling Heights Realty",
    tier: "Gold tier",
    yieldPct: 13.4,
    raised: 305_000_000,
    target: 320_000_000,
    investors: 88,
    daysRemaining: 2,
    sharePrice: 50_000,
  },
];

export const regulators = ["SEC Nigeria", "NIESV", "NDIC"];

export const trustStats = [
  { value: "₦2.4B", label: "invested" },
  { value: "3,200", label: "investors" },
  { value: "47", label: "properties" },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Browse vetted properties",
    description:
      "Every listing is checked for title, valuation and tax clearance before it goes live. Read the documents yourself.",
  },
  {
    step: 2,
    title: "Invest from ₦50,000",
    description:
      "Buy as many shares as you like by bank transfer, card or USDC. Your ownership is recorded the moment you pay.",
  },
  {
    step: 3,
    title: "Earn dividends & trade",
    description:
      "Collect rental income every quarter, track it in your portfolio, and sell your shares on the secondary market anytime.",
  },
];

export const diasporaFlags = [
  { code: "GB", flag: "🇬🇧" },
  { code: "US", flag: "🇺🇸" },
  { code: "CA", flag: "🇨🇦" },
  { code: "AE", flag: "🇦🇪" },
];

export const currencies = [
  { code: "GBP", symbol: "£", nairaRate: 2050 },
  { code: "USD", symbol: "$", nairaRate: 1600 },
  { code: "CAD", symbol: "C$", nairaRate: 1150 },
  { code: "AED", symbol: "AED ", nairaRate: 435 },
] as const;

export const agencyStats = [
  { value: "₦2.4B", label: "raised for agencies" },
  { value: "3.5%", label: "avg. commission earned", accent: true },
  { value: "11 days", label: "avg. time to fully fund" },
  { value: "124", label: "registered agencies" },
];
