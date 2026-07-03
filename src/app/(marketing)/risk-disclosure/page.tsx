import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Risk disclosure — Roova",
};

const SECTIONS = [
  {
    title: "Capital at risk",
    body: "Investing through Roova involves risk, including the possible loss of some or all of the capital you invest. Only invest money you can afford to lose.",
  },
  {
    title: "No guaranteed returns",
    body: "Projected rental yields shown on listings are estimates, not guarantees. Actual rental income can be lower than projected, or a property could go through periods of vacancy.",
  },
  {
    title: "Property value fluctuation",
    body: "Property values can fall as well as rise. The price you could sell shares for on the secondary market is not guaranteed to match or exceed what you paid.",
  },
  {
    title: "Liquidity risk",
    body: "The secondary market depends on other investors being willing to buy your shares. There's no guarantee you'll be able to sell your shares when you want to, or at the price you want.",
  },
  {
    title: "Currency risk",
    body: "Diaspora investors funding in a foreign currency are exposed to exchange rate movements between that currency and naira, which can affect the value of your investment and dividends when converted back.",
  },
  {
    title: "Regulatory risk",
    body: "Changes in Nigerian securities, property, or tax law could affect how fractional real estate investment operates, or the returns available to investors.",
  },
  {
    title: "Agency & developer risk",
    body: "Roova vets every listing agency, but agencies and developers can still underperform, delay projects, or in rare cases fail to deliver on a listing. Vetting reduces but doesn't eliminate this risk.",
  },
  {
    title: "Past performance",
    body: "Past performance of any property, agency, or the platform as a whole is not a reliable indicator of future results.",
  },
];

export default function RiskDisclosurePage() {
  return <LegalPage title="Risk disclosure" lastUpdated="3 July 2026" sections={SECTIONS} />;
}
