import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  name: string
  slug: string
  icon: string
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link key={category.slug} href={`/templates?category=${category.slug}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className="text-4xl mb-2">{category.icon}</span>
              <h3 className="font-medium text-lg">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

