export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  authorImage: string
  coverImage: string
  category: string
  content: string
}

export async function getAllBlogPosts(category?: string): Promise<BlogPost[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const url = new URL("/api/blog", baseUrl)
  if (category) {
    url.searchParams.append("category", category)
  }
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts")
  }
  return response.json()
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const url = new URL(`/api/blog/${slug}`, baseUrl)
  const response = await fetch(url.toString())
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error("Failed to fetch blog post")
  }
  return response.json()
}

