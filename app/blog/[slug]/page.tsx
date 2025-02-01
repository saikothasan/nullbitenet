import { Suspense } from "react"
import { notFound } from "next/navigation"
import BlogPost from "./blog-post"
import { Skeleton } from "@/components/ui/skeleton"
import SEO from "@/components/seo"
import { getBlogPostBySlug } from "@/lib/blog"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPost post={post} />
        </Suspense>
      </div>
    </>
  )
}

function BlogPostSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-48" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  )
}

