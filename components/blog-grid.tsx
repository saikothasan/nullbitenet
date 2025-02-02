import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="capitalize">
                  <Link href={`/blog/categories/${post.category}`}>{post.category}</Link>
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex flex-col gap-4">
            <h3 className="font-medium text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Image
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">{post.author}</span>
              </div>
              <span className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <Button size="sm" className="w-full" asChild>
              <Link href={`/blog/${post.slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

