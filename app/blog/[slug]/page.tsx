import { notFound } from "next/navigation"
import BlogPost from "@/components/blog-post"
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
        <BlogPost post={post} />
      </div>
    </>
  )
}

