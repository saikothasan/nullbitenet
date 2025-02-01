import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SEO from "@/components/seo"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Templateify - Best Blogger Templates",
    template: "%s | Templateify",
  },
  description: "Find the perfect Blogger template for your blog",
  keywords: ["blogger templates", "blog themes", "website templates"],
  authors: [{ name: "Templateify Team" }],
  creator: "Templateify",
  publisher: "Templateify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SEO />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

