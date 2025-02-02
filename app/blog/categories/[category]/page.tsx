import { notFound } from "next/navigation"
import BlogGrid from "@/components/blog-grid"
import { getAllBlogPosts } from "@/lib/blog"
import SEO from "@/components/seo"

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  const posts = await getAllBlogPosts()
  const categoryPosts = posts.filter((post) => post.category === params.category)

  if (categoryPosts.length === 0) {
    notFound()
  }

  return (
    <>
      <SEO
        title={`${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Blog Posts`}
        description={`Read our latest articles about ${params.category}.`}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center capitalize">{params.category} Blog Posts</h1>
        <BlogGrid posts={categoryPosts} />
      </div>
    </>
  )
}

