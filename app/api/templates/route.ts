import { getAllTemplates } from "@/lib/templates"
import { NextResponse } from "next/server"

export async function GET() {
  const templates = await getAllTemplates()
  return NextResponse.json(templates)
}

