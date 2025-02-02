import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const templatesDirectory = path.join(process.cwd(), "content/templates")

interface Template {
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
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const fileNames = fs.readdirSync(templatesDirectory)
  const allTemplatesData: Template[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(templatesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      price: data.price,
      extendedPrice: data.extendedPrice,
      updatedDate: data.updatedDate,
      version: data.version,
      image: data.image,
      category: data.category,
      demoUrl: data.demoUrl,
      downloadUrl: data.downloadUrl,
      buyUrl: data.buyUrl,
      features: data.features || [],
    }
  })

  const filteredTemplates = category
    ? allTemplatesData.filter((template) => template.category?.toLowerCase() === category.toLowerCase())
    : allTemplatesData

  return NextResponse.json(filteredTemplates)
}

