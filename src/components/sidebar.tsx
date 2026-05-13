"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Library,
  Palette,
  LayoutTemplate,
  Sun,
  Moon,
  ChevronRight,
  Smartphone,
  Monitor,
  SmartphoneNfc,
  MousePointerClick,
  FormInput,
  Layout,
  Table,
  Navigation,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/registry";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  basic: MousePointerClick,
  form: FormInput,
  layout: Layout,
  "data-display": Table,
  navigation: Navigation,
  feedback: AlertCircle,
  animation: Sparkles,
  mobile: Smartphone,
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => setMounted(true), []);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-zinc-50/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Library className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-semibold">UI Reference Hub</span>
            <span className="block text-[10px] leading-none text-zinc-400">组件参考库</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="搜索组件..."
              className="pl-8 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-1 pb-4">
            <NavItem href="/" icon={LayoutTemplate} exact>
              总览
            </NavItem>

            <div className="pt-3 pb-1">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                组件分类
              </span>
            </div>

            {CATEGORIES.filter((c) => c.id !== "templates").map((cat) => {
              const Icon = categoryIcons[cat.id] || MousePointerClick;
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60",
                      pathname.includes(`/components/${cat.id}`) && "bg-zinc-200/80 dark:bg-zinc-800/80 font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span className="flex-1 text-left">{cat.name}</span>
                    <span className="text-[11px] text-zinc-400">{cat.count}</span>
                    <ChevronRight className={cn("h-3 w-3 text-zinc-400 transition-transform", expandedCategories[cat.id] && "rotate-90")} />
                  </button>
                </div>
              );
            })}

            <div className="pt-4 pb-1">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                更多
              </span>
            </div>
            <NavItem href="/playground" icon={LayoutTemplate}>
              Playground
            </NavItem>
            <NavItem href="/templates" icon={LayoutTemplate}>
              页面模板
            </NavItem>
            <NavItem href="/design-system" icon={Palette}>
              Design Token
            </NavItem>
          </nav>
        </ScrollArea>

        {/* Theme toggle */}
        <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "浅色模式" : "深色模式"}
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
  exact,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60",
        isActive && "bg-zinc-200/80 dark:bg-zinc-800/80 font-medium"
      )}
    >
      <Icon className="h-4 w-4 text-zinc-500" />
      {children}
    </Link>
  );
}
