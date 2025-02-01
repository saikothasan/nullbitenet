import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SEO from "@/components/seo"

const plans = [
  {
    name: "Basic",
    price: 0,
    features: ["Access to free templates", "Community support", "Basic customization", "Ads included"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 9.99,
    features: [
      "Access to all templates",
      "Priority email support",
      "Advanced customization",
      "Ad-free experience",
      "SEO optimization tools",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: 29.99,
    features: [
      "All Pro features",
      "Dedicated support",
      "Custom template development",
      "Multiple site license",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
  },
]

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Choose the perfect plan for your blogging needs. From free templates to custom solutions, we have options for every blogger."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.name === "Pro" ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>${plan.price}/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{plan.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

