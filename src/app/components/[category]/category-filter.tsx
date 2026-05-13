"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/registry";

export function CategoryFilter({ category }: { category: string }) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}&cat=${category}`);
    }
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="在当前分类中搜索..."
          className="pl-8"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.filter((c) => c.id !== "templates").map((cat) => (
          <button
            key={cat.id}
            onClick={() => router.push(`/components/${cat.id}`)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              cat.id === category
                ? "border-zinc-900 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 dark:border-white"
                : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
