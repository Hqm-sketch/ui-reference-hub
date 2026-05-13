import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "api");

// Read all component data files
const categories = ["basic", "form", "layout", "data-display", "navigation", "feedback", "animation", "mobile"];
const categoryNames = {
  basic: "基础组件", form: "表单组件", layout: "布局组件",
  "data-display": "数据展示", navigation: "导航组件",
  feedback: "反馈组件", animation: "动画/特效", mobile: "移动端专用",
};

const allComponents = [];
const categoryCounts = {};

for (const cat of categories) {
  const filePath = join(__dirname, "..", "src", "content", "components", `${cat}.ts`);
  const content = readFileSync(filePath, "utf-8");

  // Extract component names and descriptions using regex
  const nameRegex = /name:\s*"([^"]+)"/g;
  const descRegex = /description:\s*"([^"]+)"/g;
  const platformRegex = /platform:\s*\[([^\]]+)\]/g;
  const tagsRegex = /tags:\s*\[([^\]]+)\]/g;
  const variantsRegex = /variants:\s*\[([^\]]+)\]/g;
  const complexityRegex = /complexity:\s*"([^"]+)"/g;
  const accessibilityRegex = /accessibility:\s*"([^"]+)"/g;
  const tokensRegex = /designTokens:\s*\{([^}]+)\}/g;
  const codeExampleRegex = /codeExample:\s*`([^`]*)`/gs;

  const names = [...content.matchAll(nameRegex)].map(m => m[1]);
  const descs = [...content.matchAll(descRegex)].map(m => m[1]);
  const platforms = [...content.matchAll(platformRegex)].map(m => m[1]);
  const tags = [...content.matchAll(tagsRegex)].map(m => m[1]);
  const variants = [...content.matchAll(variantsRegex)].map(m => m[1]);
  const complexities = [...content.matchAll(complexityRegex)].map(m => m[1]);
  const accessibilities = [...content.matchAll(accessibilityRegex)].map(m => m[1]);
  const codeExamples = [...content.matchAll(codeExampleRegex)].map(m => m[1].trim().slice(0, 100));

  for (let i = 0; i < names.length; i++) {
    allComponents.push({
      name: names[i],
      category: cat,
      categoryName: categoryNames[cat],
      description: descs[i] || "",
      platform: (platforms[i] || "").replace(/"/g, "").split(",").map(s => s.trim()),
      tags: (tags[i] || "").replace(/"/g, "").split(",").map(s => s.trim()),
      variants: (variants[i] || "").replace(/"/g, "").split(",").map(s => s.trim()),
      complexity: complexities[i] || "simple",
      accessibility: accessibilities[i] || "",
      designTokens: {},
      codeExample: codeExamples[i] || "",
      url: `/components/${cat}/${(names[i] || "").toLowerCase()}`,
    });
  }
  categoryCounts[cat] = names.length;
}

const metadata = {
  name: "UI Reference Hub",
  version: "1.0.0",
  description: "AI 驱动的 UI 组件参考库，200+ 组件覆盖桌面端和移动端",
  totalComponents: allComponents.length,
  categories: Object.entries(categoryCounts).map(([id, count]) => ({
    id,
    name: categoryNames[id],
    count,
  })),
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
};

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "metadata.json"), JSON.stringify(metadata, null, 2));
console.log(`Generated metadata.json with ${allComponents.length} components`);
