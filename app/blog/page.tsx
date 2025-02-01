"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllBlogPosts } from "@/lib/blog"
import SEO from "@/components/seo"

const POSTS_PER_PAGE = 10

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [blogPosts, setBlogPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  useState(async () => {
    const allBlogPosts = await getAllBlogPosts()
    setBlogPosts(allBlogPosts)
    setTotalPages(Math.ceil(allBlogPosts.length / POSTS_PER_PAGE))
  }, [])

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  return (
    <>
      <SEO
        title="Blog"
        description="Read the latest articles on blogging tips, template customization, and web design trends."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Templateify Blog</h1>
        <Input
          type="search"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-8 max-w-md mx-auto"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {paginatedPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Published on {new Date(post.date).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          {currentPage > 1 && (
            <Button onClick={() => setCurrentPage(currentPage - 1)} variant="outline">
              Previous
            </Button>
          )}
          {currentPage < totalPages && (
            <Button onClick={() => setCurrentPage(currentPage + 1)} variant="outline">
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

