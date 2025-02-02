import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    }
  })

  const filteredPosts = category ? allPostsData.filter((post) => post.category === category) : allPostsData

  // Sort posts by date
  const sortedPosts = filteredPosts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return NextResponse.json(sortedPosts)
}

