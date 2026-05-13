import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, getComponentsByCategory } from "@/lib/registry";
import { Badge } from "@/components/ui/badge";
import { CategoryFilter } from "./category-filter";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return { title: "未找到" };
  return {
    title: `${cat.name} | UI Reference Hub`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const components = await getComponentsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">首页</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">{cat.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{cat.name}</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">共 {components.length} 个组件</p>
      </div>

      <CategoryFilter category={category} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((comp) => (
          <Link
            key={comp.name}
            href={`/components/${category}/${comp.name.toLowerCase()}`}
            className="group rounded-xl border border-zinc-200 p-4 transition-all hover:shadow-md hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-sm">{comp.name}</h3>
              <Badge variant="secondary" className="text-[10px] shrink-0">
                {comp.complexity === "simple" ? "简单" : comp.complexity === "medium" ? "中等" : "复杂"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{comp.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {comp.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
