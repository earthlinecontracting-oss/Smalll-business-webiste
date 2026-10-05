import type { Metadata } from "next";

import { GalleryGrid } from "@/components/GalleryGrid";
import { PageCta } from "@/components/PageCta";
import { Section } from "@/components/Section";
import { gallery } from "@/config/gallery";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Project photos from ${site.name} earthworks jobs in ${site.serviceArea}.`,
};

export default function GalleryPage() {
  return (
    <>
      <Section
        id="gallery"
        eyebrow="Our work"
        title="Gallery"
        description="Job-site photos. GPS and other metadata are stripped before anything is published."
      >
        <GalleryGrid items={gallery} />
      </Section>
      <PageCta />
    </>
  );
}
