"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { CATEGORIES, searchComponents, type ComponentMeta } from "@/lib/registry";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type SearchResult = Pick<ComponentMeta, "name" | "category" | "description" | "tags" | "platform" | "complexity">;

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="py-16 text-center text-zinc-400">加载中...</div>}>
      <SearchContent />
    </React.Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCat = searchParams.get("cat") || "";

  const [query, setQuery] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCat);
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [searched, setSearched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialQuery) handleSearch(initialQuery);
  }, []);

  const handleSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) { setResults([]); setSearched(false); return; }
    setLoading(true);
    const filtered = await searchComponents(trimmed);
    setResults(filtered);
    setSearched(true);
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery(""); setSelectedCategory("");
    setResults([]); setSearched(false);
  };

  const platformNames: Record<string, string> = { desktop: "桌面", mobile: "移动", tablet: "平板" };

  // Filter by selected category client-side
  const displayResults = selectedCategory
    ? results.filter((c) => c.category === selectedCategory)
    : results;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2">搜索组件</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">按名称、标签或分类搜索</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
        <Input
          className="h-12 pl-10 pr-10 text-base"
          placeholder="搜索组件..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); handleSearch(e.target.value); }}
          autoFocus
        />
        {query && (
          <button className="absolute right-3 top-3 rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={clearSearch}>
            <X className="h-4 w-4 text-zinc-400" />
          </button>
        )}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={() => setSelectedCategory("")} className={`rounded-lg border px-3 py-1.5 text-sm ${!selectedCategory ? "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>全部</button>
        {CATEGORIES.filter((c) => c.id !== "templates").map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`rounded-lg border px-3 py-1.5 text-sm ${selectedCategory === cat.id ? "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>{cat.name}</button>
        ))}
      </div>

      <div className="space-y-3">
        {!searched && !loading && (
          <div className="py-16 text-center text-zinc-400">
            <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>输入关键词开始搜索</p>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center text-zinc-400">
            <p>搜索中...</p>
          </div>
        )}

        {searched && !loading && displayResults.length === 0 && (
          <div className="py-16 text-center text-zinc-400">
            <p className="text-lg">未找到匹配的组件</p>
          </div>
        )}

        {displayResults.map((comp) => (
          <Link key={comp.name} href={`/components/${comp.category}/${comp.name.toLowerCase()}`}>
            <Card className="group transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{comp.name}</h3>
                      <Badge variant="secondary" className="text-[10px]">{CATEGORIES.find((c) => c.id === comp.category)?.name}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{comp.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {comp.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{comp.complexity === "simple" ? "简单" : comp.complexity === "medium" ? "中等" : "复杂"}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {searched && displayResults.length > 0 && (
        <p className="mt-6 text-sm text-zinc-400 text-center">共找到 {displayResults.length} 个组件</p>
      )}
    </div>
  );
}
