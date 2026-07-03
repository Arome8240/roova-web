import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PropertyDetailContent } from "@/features/admin/components/properties/property-detail-content";
import { properties } from "@/features/admin/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  return { title: property ? `${property.title} — Admin Dashboard | Roova` : "Property — Roova" };
}

export default async function AdminPropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Property details" />
      <PropertyDetailContent id={id} />
    </div>
  );
}
