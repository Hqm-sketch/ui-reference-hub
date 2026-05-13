"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentRenderer } from "@/components/component-renderer";

export function ComponentDetailClient({ codeExample, componentName, category, variants }: {
  codeExample: string;
  componentName: string;
  category: string;
  variants: string[];
}) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-2xl">
        <ComponentRenderer componentName={componentName} category={category} variants={variants} />
      </div>
      <p className="mt-4 text-xs text-zinc-400">响应式预览区 — 切换设备类型查看不同尺寸效果</p>
    </div>
  );
}

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "已复制" : "复制"}
    </Button>
  );
}
