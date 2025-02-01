"use client"

import { MDXRemote } from "next-mdx-remote/rsc"
import type { BlogPost } from "@/lib/blog"

export default function BlogPost({ post }: { post: BlogPost }) {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-8">Published on {new Date(post.date).toLocaleDateString()}</p>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

