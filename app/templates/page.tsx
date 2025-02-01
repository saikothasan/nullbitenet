import { Suspense } from "react"
import TemplateList from "./template-list"
import { Skeleton } from "@/components/ui/skeleton"
import SEO from "@/components/seo"

export default function TemplatesPage() {
  return (
    <>
      <SEO
        title="All Templates"
        description="Browse our collection of free and premium Blogger templates. Find the perfect theme for your blog and start customizing today."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Discover Our Templates</h1>
        <Suspense fallback={<TemplatesSkeleton />}>
          <TemplateList />
        </Suspense>
      </div>
    </>
  )
}

function TemplatesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-lg" />
        ))}
      </div>
    </div>
  )
}

