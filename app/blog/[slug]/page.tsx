import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog"
import SEO from "@/components/seo"

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-8">Published on {new Date(post.date).toLocaleDateString()}</p>
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </>
  )
}

