import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Check, X, Facebook, Twitter, Mail, Eye, Download } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RelatedTemplates from "@/components/related-templates"
import { getTemplateBySlug, getAllTemplates } from "@/lib/templates"
import SEO from "@/components/seo"

export async function generateStaticParams() {
  const templates = await getAllTemplates()
  return templates.map((template) => ({
    slug: template.slug,
  }))
}

export default async function TemplatePage({ params }: { params: { slug: string } }) {
  const template = await getTemplateBySlug(params.slug)

  if (!template) {
    notFound()
  }

  return (
    <>
      <SEO title={template.title} description={template.description} image={template.image} />
      <div className="container mx-auto px-4 py-12">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/templates" className="hover:text-primary transition-colors">
            Templates
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{template.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{template.title}</h1>
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <Badge variant="secondary">Premium Template</Badge>
                <span className="text-muted-foreground">
                  Updated: {new Date(template.updatedDate).toLocaleDateString()}
                </span>
                <span className="text-muted-foreground">Version {template.version}</span>
              </div>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={`${template.title} Preview`}
                  width={1200}
                  height={800}
                  className="w-full"
                />
                <div className="p-4 flex items-center justify-between border-t bg-card">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <MDXRemote source={template.content} />
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="installation" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <h3>Installation Guide</h3>
                  <ol>
                    <li>Purchase and download the template files</li>
                    <li>Log in to your Blogger dashboard</li>
                    <li>Navigate to Theme > Edit HTML</li>
                    <li>Backup your current theme</li>
                    <li>Upload the new template files</li>
                    <li>Save and publish your new theme</li>
                  </ol>
                  <p>
                    For detailed customization options, please refer to our{" "}
                    <a href="/documentation" className="text-primary hover:underline">
                      documentation
                    </a>
                    .
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span className="block text-lg">Premium License</span>
                    <span className="text-sm text-muted-foreground">Most Popular</span>
                  </div>
                  <span className="text-3xl font-bold">${template.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { feature: "Lifetime Updates", included: true },
                    { feature: "Premium Support", included: true },
                    { feature: "All Features Included", included: true },
                    { feature: "Custom Installation", included: false },
                  ].map(({ feature, included }) => (
                    <li key={feature} className="flex items-center gap-3">
                      {included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                      <span className={included ? "" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Buy Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" /> Download Free Version
                </Button>
                <p className="text-sm text-center mt-4 text-muted-foreground">
                  Free version includes basic features with credit attribution required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <RelatedTemplates currentSlug={template.slug} />
      </div>
    </>
  )
}

