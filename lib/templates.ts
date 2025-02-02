export interface Template {
  slug: string
  title: string
  description: string
  price: number
  extendedPrice: number
  updatedDate: string
  version: string
  image: string
  category: string
  demoUrl?: string
  downloadUrl?: string
  buyUrl?: string
  features: string[]
  content: string
  screenshots?: string[]
}

export async function getAllTemplates(category?: string): Promise<Template[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const url = new URL("/api/templates", baseUrl)
  if (category) {
    url.searchParams.append("category", category)
  }
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error("Failed to fetch templates")
  }
  return response.json()
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const url = new URL(`/api/templates/${slug}`, baseUrl)
  const response = await fetch(url.toString())
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error("Failed to fetch template")
  }
  return response.json()
}

