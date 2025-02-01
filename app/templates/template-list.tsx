"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import TemplateGrid from "@/components/template-grid"
import { useTemplates } from "./use-templates"

export default function TemplateList() {
  const { templates } = useTemplates()
  const [searchTerm, setSearchTerm] = useState("")
  const [priceFilter, setPriceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 9

  const filteredTemplates = templates
    .filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((template) => {
      if (priceFilter === "free") return template.price === 0
      if (priceFilter === "paid") return template.price > 0
      return true
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
      if (sortBy === "oldest") return new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime()
      if (sortBy === "priceLowHigh") return a.price - b.price
      if (sortBy === "priceHighLow") return b.price - a.price
      return 0
    })

  const indexOfLastTemplate = currentPage * templatesPerPage
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TemplateGrid templates={currentTemplates} />

      {filteredTemplates.length > templatesPerPage && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: Math.ceil(filteredTemplates.length / templatesPerPage) }).map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                variant={currentPage === index + 1 ? "default" : "outline"}
                className="px-4 py-2"
              >
                {index + 1}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

