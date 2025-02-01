import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return new NextResponse("Post not found", { status: 404 })
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return NextResponse.json({
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
  })
}

