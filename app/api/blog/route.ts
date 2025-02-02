import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  author: string
  authorImage: string
  coverImage: string
  content: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: BlogPost[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      authorImage: data.authorImage,
      coverImage: data.coverImage,
      content,
    }
  })

  const filteredPosts = category
    ? allPostsData.filter((post) => post.category?.toLowerCase() === category.toLowerCase())
    : allPostsData

  // Sort posts by date
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return NextResponse.json(sortedPosts)
}

