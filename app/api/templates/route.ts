import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const templatesDirectory = path.join(process.cwd(), "content/templates")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const fileNames = fs.readdirSync(templatesDirectory)
  const allTemplatesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(templatesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    }
  })

  const filteredTemplates = category
    ? allTemplatesData.filter((template) => template.category === category)
    : allTemplatesData

  return NextResponse.json(filteredTemplates)
}

