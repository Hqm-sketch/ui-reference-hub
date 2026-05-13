import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Monitor, Smartphone, Tablet, Tag, Palette, Accessibility, Link2 } from "lucide-react";
import { getComponentBySlug, getComponentsByCategory, CATEGORIES } from "@/lib/registry";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ComponentDetailClient } from "./client";

interface Props {
  params: Promise<{ category: string; component: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, component } = await params;
  const comp = await getComponentBySlug(category, component);
  if (!comp) return { title: "未找到" };
  return {
    title: `${comp.name} | UI Reference Hub`,
    description: comp.description,
  };
}

export default async function ComponentDetailPage({ params }: Props) {
  const { category, component } = await params;
  const comp = await getComponentBySlug(category, component);
  if (!comp) notFound();

  const cat = CATEGORIES.find((c) => c.id === category);
  const allInCategory = await getComponentsByCategory(category);
  const related = allInCategory.filter((c) => c.name !== comp.name).slice(0, 4);

  const platformIcons: Record<string, React.ReactNode> = {
    desktop: <Monitor className="h-3.5 w-3.5" />,
    mobile: <Smartphone className="h-3.5 w-3.5" />,
    tablet: <Tablet className="h-3.5 w-3.5" />,
  };
  const platformNames: Record<string, string> = { desktop: "桌面端", mobile: "移动端", tablet: "平板" };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">首页</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/components/${category}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">{cat?.name || category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">{comp.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{comp.name}</h1>
            <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">{comp.description}</p>
          </div>
          <Badge variant="secondary">{comp.complexity === "simple" ? "简单" : comp.complexity === "medium" ? "中等" : "复杂"}</Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {comp.platform.map((p) => (
            <Badge key={p} variant="outline" className="gap-1.5">{platformIcons[p]}{platformNames[p]}</Badge>
          ))}
          {comp.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs"><Tag className="mr-1 h-3 w-3" />{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader><CardTitle className="text-base">实时预览</CardTitle></CardHeader>
            <CardContent>
              <ComponentDetailClient codeExample={comp.codeExample} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">变体</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {comp.variants.map((v) => <Badge key={v} variant="outline" className="px-3 py-1 text-sm">{v}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">代码示例</CardTitle>
              <ComponentDetailClient.CopyButton code={comp.codeExample} />
            </CardHeader>
            <CardContent>
              <pre className="!bg-zinc-950 !text-zinc-100 dark:!bg-zinc-900"><code>{comp.codeExample}</code></pre>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Palette className="h-4 w-4" />设计 Token</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(comp.designTokens).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{key}</span>
                    <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Accessibility className="h-4 w-4" />无障碍</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{comp.accessibility}</p></CardContent>
          </Card>

          {related.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Link2 className="h-4 w-4" />相关组件</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {related.map((r) => (
                    <Link key={r.name} href={`/components/${r.category}/${r.name.toLowerCase()}`}
                      className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      <span className="font-medium">{r.name}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
