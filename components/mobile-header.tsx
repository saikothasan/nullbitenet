"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="flex flex-col space-y-4 mt-4">
            <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/templates" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Templates
            </Link>
            <Link href="/blog" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

