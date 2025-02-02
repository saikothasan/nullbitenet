import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, ShoppingCart } from "lucide-react"
import type { Template } from "@/lib/templates"

export default function TemplateGrid({ templates }: { templates: Template[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.slug} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="capitalize">
                  <Link href={`/templates/categories/${template.category}`}>{template.category}</Link>
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {template.demoUrl && (
                  <Button size="sm" variant="secondary" className="backdrop-blur-md bg-white/80" asChild>
                    <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-medium">{template.title}</h3>
              <span className="text-sm font-bold">${template.price}</span>
            </div>
            <div className="flex gap-2 w-full">
              {template.downloadUrl && (
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href={template.downloadUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Free
                  </a>
                </Button>
              )}
              {template.buyUrl && (
                <Button size="sm" className="flex-1" asChild>
                  <a href={template.buyUrl}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </a>
                </Button>
              )}
            </div>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href={`/templates/${template.slug}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

