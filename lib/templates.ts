import fs from "fs"
import path from "path"
import matter from "gray-matter"

const templatesDirectory = path.join(process.cwd(), "content/templates")

export interface Template {
  slug: string
  title: string
  description: string
  price: number
  extendedPrice: number
  updatedDate: string
  version: string
  image: string
  features: string[]
  content: string
}

export async function getAllTemplates(): Promise<Template[]> {
  const fileNames = fs.readdirSync(templatesDirectory)
  const templates = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(templatesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      ...data,
      content,
    } as Template
  })

  return templates
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const fullPath = path.join(templatesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    ...data,
    content,
  } as Template
}

