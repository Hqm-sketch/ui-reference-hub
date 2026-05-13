export interface ComponentMeta {
  name: string;
  category: string;
  description: string;
  platform: ("desktop" | "mobile" | "tablet")[];
  tags: string[];
  variants: string[];
  accessibility: string;
  complexity: "simple" | "medium" | "complex";
  designTokens: Record<string, string>;
  related: string[];
  codeExample: string;
}

export const CATEGORIES = [
  { id: "basic", name: "基础组件", icon: "Square", count: 24 },
  { id: "form", name: "表单组件", icon: "FormInput", count: 20 },
  { id: "layout", name: "布局组件", icon: "Layout", count: 16 },
  { id: "data-display", name: "数据展示", icon: "Table", count: 18 },
  { id: "navigation", name: "导航组件", icon: "Navigation", count: 12 },
  { id: "feedback", name: "反馈组件", icon: "AlertCircle", count: 16 },
  { id: "animation", name: "动画/特效", icon: "Sparkles", count: 14 },
  { id: "mobile", name: "移动端专用", icon: "Smartphone", count: 14 },
  { id: "templates", name: "页面模板", icon: "LayoutTemplate", count: 15 },
];

// Cache for lazy-loaded components
const categoryCache: Record<string, ComponentMeta[]> = {};

async function loadCategory(category: string): Promise<ComponentMeta[]> {
  if (categoryCache[category]) return categoryCache[category];
  const mod = await import(`@/content/components/${category}`) as Record<string, ComponentMeta[]>;
  const key = category === "data-display" ? "dataDisplayComponents" : `${category}Components`;
  const data = mod[key] || [];
  categoryCache[category] = data;
  return data;
}

// Predefined search index (lightweight - no codeExample)
interface SearchEntry { name: string; category: string; description: string; tags: string[]; }
let searchIndex: SearchEntry[] | null = null;

async function loadSearchIndex(): Promise<SearchEntry[]> {
  if (searchIndex) return searchIndex;
  const entries: SearchEntry[] = [];
  for (const cat of CATEGORIES.filter(c => c.id !== "templates")) {
    try {
      const mod = await import(`@/content/components/${cat.id}`) as Record<string, ComponentMeta[]>;
      const key = cat.id === "data-display" ? "dataDisplayComponents" : `${cat.id}Components`;
      const data = (mod[key] || []) as ComponentMeta[];
      data.forEach(c => entries.push({ name: c.name, category: c.category, description: c.description, tags: c.tags }));
    } catch { /* skip if category file missing */ }
  }
  searchIndex = entries;
  return entries;
}

export async function getComponentsByCategory(category: string): Promise<ComponentMeta[]> {
  return loadCategory(category);
}

export async function getComponentBySlug(category: string, name: string): Promise<ComponentMeta | undefined> {
  const components = await loadCategory(category);
  return components.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export async function searchComponents(query: string): Promise<Pick<ComponentMeta, "name" | "category" | "description" | "tags" | "platform" | "complexity">[]> {
  const lower = query.toLowerCase();
  const entries = await loadSearchIndex();
  return entries.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.tags.some((t) => t.toLowerCase().includes(lower)) ||
      c.category.toLowerCase().includes(lower)
  );
}
