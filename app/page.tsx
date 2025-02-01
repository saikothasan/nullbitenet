import Link from "next/link"
import { Button } from "@/components/ui/button"
import TemplateGrid from "@/components/template-grid"
import CategoryGrid from "@/components/category-grid"
import { getAllTemplates } from "@/lib/templates"
import { getAllBlogPosts } from "@/lib/blog"
import SEO from "@/components/seo"
import { ArrowRight, Check, Star } from "lucide-react"

export default async function Home() {
  const allTemplates = await getAllTemplates()
  const featuredTemplates = allTemplates.slice(0, 6)

  const categories = [
    { name: "Blog", slug: "blog", icon: "📝" },
    { name: "E-commerce", slug: "ecommerce", icon: "🛒" },
    { name: "Portfolio", slug: "portfolio", icon: "🎨" },
    { name: "Magazine", slug: "magazine", icon: "📰" },
  ]

  const recentBlogPosts = await getAllBlogPosts()
  const featuredBlogPosts = recentBlogPosts.slice(0, 3)

  return (
    <>
      <SEO
        title="Home"
        description="Discover the best free and premium Blogger templates for your blog. Start sharing your ideas with the world using our professionally designed themes."
      />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Elevate Your Blog with Professional Templates</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the perfect template for your blog and start sharing your ideas with the world. Our professionally
            designed themes will make your content shine.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/templates">Browse Templates</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Featured Templates</h2>
          <TemplateGrid templates={featuredTemplates} />
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/templates">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Browse by Category</h2>
          <CategoryGrid categories={categories} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Latest from Our Blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBlogPosts.map((post) => (
              <div key={post.slug} className="border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Why Choose Our Templates?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Responsive design for all devices",
              "SEO optimized for better rankings",
              "Easy customization options",
              "Regular updates and improvements",
              "Professional and modern designs",
              "Excellent customer support",
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Food Blogger",
                comment:
                  "The templates are not only beautiful but also incredibly easy to customize. Highly recommended!",
              },
              {
                name: "Jane Smith",
                role: "Travel Photographer",
                comment:
                  "I've tried many template providers, but Templateify offers the best quality and support by far.",
              },
              {
                name: "Mike Johnson",
                role: "Tech Reviewer",
                comment: "The SEO optimization in these templates has significantly improved my blog's visibility.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary text-white p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Ready to Get Started?</h2>
          <p className="text-center mb-8">
            Choose from our wide range of professional templates and start building your dream blog today.
          </p>
          <div className="text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

