import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const templatesDirectory = path.join(process.cwd(), "content/templates")

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const fullPath = path.join(templatesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return new NextResponse("Template not found", { status: 404 })
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return NextResponse.json({
    slug,
    ...data,
    content,
  })
}

