import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PropertyDetailContent } from "@/features/agency/components/properties/property-detail-content";
import { properties } from "@/features/agency/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  return { title: property ? `${property.title} — Agency Dashboard | Roova` : "Property — Roova" };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exists = properties.some((p) => p.id === id);
  if (!exists) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title="Property details" />
      <PropertyDetailContent id={id} />
    </div>
  );
}
