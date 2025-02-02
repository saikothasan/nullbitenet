"use client"

import { useEffect, useState } from "react"
import type { Template } from "@/lib/templates"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch(`${BASE_URL}/api/templates`)
        if (!response.ok) {
          throw new Error("Failed to fetch templates")
        }
        const data = await response.json()
        setTemplates(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return { templates, isLoading, error }
}

