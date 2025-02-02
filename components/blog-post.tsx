import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { BlogPost } from "@/lib/blog"

export default function BlogPost({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-4">
          <Image
            src={post.authorImage || "/placeholder.svg"}
            alt={post.author}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <span className="text-gray-600">By {post.author}</span>
        </div>
        <time className="text-gray-500" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </time>
      </header>
      <Image
        src={post.coverImage || "/placeholder.svg"}
        alt={post.title}
        width={1200}
        height={630}
        className="w-full h-auto mb-8 rounded-lg"
      />
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

