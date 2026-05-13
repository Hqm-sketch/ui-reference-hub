import { NextResponse } from "next/server";
import { CATEGORIES, getComponentsByCategory } from "@/lib/registry";

export async function GET() {
  const categories = CATEGORIES.filter((c) => c.id !== "templates");
  const allComponents = [];

  for (const cat of categories) {
    const components = await getComponentsByCategory(cat.id);
    for (const c of components) {
      allComponents.push({
        name: c.name,
        category: c.category,
        description: c.description,
        platform: c.platform,
        tags: c.tags,
        variants: c.variants,
        complexity: c.complexity,
        accessibility: c.accessibility,
        designTokens: c.designTokens,
        codeExample: c.codeExample,
        related: c.related,
        url: `/components/${c.category}/${c.name.toLowerCase()}`,
      });
    }
  }

  return NextResponse.json({
    name: "UI Reference Hub",
    version: "1.0.0",
    totalComponents: allComponents.length,
    categories: categories.map((c) => ({ id: c.id, name: c.name, count: c.count })),
    components: allComponents,
    designTokens: {
      colors: {
        primary: ["#18181b", "#27272a", "#3f3f46", "#a1a1aa"],
        accent: ["#2563eb", "#3b82f6", "#60a5fa"],
        success: ["#059669", "#10b981", "#34d399"],
      },
      spacing: ["0.25rem", "0.5rem", "1rem", "1.5rem", "2rem", "3rem", "4rem"],
      borderRadius: ["0.25rem", "0.375rem", "0.5rem", "0.75rem", "1rem", "9999px"],
    },
  }, {
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
  });
}
