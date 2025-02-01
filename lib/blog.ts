export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${BASE_URL}/api/blog`)
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts")
  }
  return response.json()
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetch(`${BASE_URL}/api/blog/${slug}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error("Failed to fetch blog post")
  }
  return response.json()
}

