"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"

export default function SEO({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const pathname = usePathname()
  const defaultTitle = "Templateify - Best Blogger Templates"
  const defaultDescription = "Find the perfect Blogger template for your blog"
  const defaultImage = "https://templateify.com/og-image.jpg" // Replace with your actual OG image URL

  const seoTitle = title ? `${title} | Templateify` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoImage = image || defaultImage

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://templateify.com${pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Head>
  )
}

