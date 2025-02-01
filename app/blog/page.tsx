import { Suspense } from "react"
import BlogList from "./blog-list"
import { Skeleton } from "@/components/ui/skeleton"
import SEO from "@/components/seo"

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog"
        description="Read the latest articles on blogging tips, template customization, and web design trends."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Templateify Blog</h1>
        <Suspense fallback={<BlogSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </>
  )
}

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 max-w-md mx-auto" />
      <div className="grid md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ))}
      </div>
    </div>
  )
}

