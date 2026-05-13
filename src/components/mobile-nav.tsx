"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORIES } from "@/lib/registry";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl dark:bg-zinc-950">
            <div className="flex h-14 items-center justify-between border-b px-4 dark:border-zinc-800">
              <span className="font-semibold text-sm">UI Reference Hub</span>
              <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              <nav className="p-4 space-y-1">
                <MobileNavItem href="/" onClick={() => setOpen(false)}>总览</MobileNavItem>
                {CATEGORIES.map((cat) => (
                  <MobileNavItem key={cat.id} href={`/components/${cat.id}`} onClick={() => setOpen(false)}>
                    {cat.name}
                  </MobileNavItem>
                ))}
                <div className="pt-3 border-t mt-3 dark:border-zinc-800">
                  <MobileNavItem href="/templates" onClick={() => setOpen(false)}>页面模板</MobileNavItem>
                  <MobileNavItem href="/design-system" onClick={() => setOpen(false)}>Design Token</MobileNavItem>
                  <MobileNavItem href="/search" onClick={() => setOpen(false)}>搜索</MobileNavItem>
                </div>
                {mounted && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 mt-2"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === "dark" ? "浅色模式" : "深色模式"}
                  </Button>
                )}
              </nav>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
        pathname === href && "bg-zinc-100 dark:bg-zinc-800 font-medium"
      )}
    >
      {children}
    </Link>
  );
}
