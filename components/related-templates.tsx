import TemplateGrid from "./template-grid"
import { getAllTemplates } from "@/lib/templates"

export default async function RelatedTemplates({ currentSlug }: { currentSlug: string }) {
  const allTemplates = await getAllTemplates()
  const relatedTemplates = allTemplates.filter((template) => template.slug !== currentSlug).slice(0, 3)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Templates</h2>
      <TemplateGrid templates={relatedTemplates} />
    </section>
  )
}

