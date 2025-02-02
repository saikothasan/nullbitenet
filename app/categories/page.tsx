import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SEO from "@/components/seo"

const categories = [
  {
    name: "Templates",
    slug: "templates",
    subcategories: ["Blog", "Portfolio", "Magazine", "E-commerce", "News", "Personal"],
  },
  {
    name: "Blog",
    slug: "blog",
    subcategories: ["Web Design", "Blogging Tips", "SEO", "Digital Marketing", "Social Media", "Content Creation"],
  },
]

export default function CategoriesPage() {
  return (
    <>
      <SEO title="Categories" description="Browse all categories for templates and blog posts." />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Categories</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.slug}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <Link
                        href={`/${category.slug}/categories/${subcategory.toLowerCase()}`}
                        className="text-blue-600 hover:underline"
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

