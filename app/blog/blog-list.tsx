"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBlogPosts } from "./use-blog-posts"

const POSTS_PER_PAGE = 10

export default function BlogList() {
  const { posts } = useBlogPosts()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  return (
    <div className="space-y-8">
      <Input
        type="search"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md mx-auto"
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
      {totalPages > 1 && (
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
      )}
    </div>
  )
}

