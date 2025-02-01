import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Template } from "@/lib/templates"

export default function TemplateGrid({ templates }: { templates: Template[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.slug} className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src={template.image || "/placeholder.svg"}
              alt={template.title}
              width={600}
              height={400}
              className="object-cover w-full h-48"
            />
          </CardContent>
          <CardFooter className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">{template.title}</h3>
              <p className="text-sm text-muted-foreground">${template.price}</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/templates/${template.slug}`}>View</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

