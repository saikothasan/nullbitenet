import { notFound } from "next/navigation"
import TemplateGrid from "@/components/template-grid"
import { getAllTemplates } from "@/lib/templates"
import SEO from "@/components/seo"

export default async function TemplateCategoryPage({ params }: { params: { category: string } }) {
  const templates = await getAllTemplates()
  const categoryTemplates = templates.filter((template) => template.category === params.category)

  if (categoryTemplates.length === 0) {
    notFound()
  }

  return (
    <>
      <SEO
        title={`${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Templates`}
        description={`Browse our collection of ${params.category} templates for your blog.`}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center capitalize">{params.category} Templates</h1>
        <TemplateGrid templates={categoryTemplates} />
      </div>
    </>
  )
}

