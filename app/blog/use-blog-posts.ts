"use client"

import { useEffect, useState } from "react"
import type { BlogPost } from "@/lib/blog"

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, isLoading, error }
}

