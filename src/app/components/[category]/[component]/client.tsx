"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Simple render of the preview area - shows the component name as a visual placeholder */
export function ComponentDetailClient({ codeExample }: { codeExample: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex max-w-md flex-wrap items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-zinc-800/50">
          {/* Render example buttons/cards to give visual preview */}
          <PreviewRenderer codeExample={codeExample} />
        </div>
        <p className="text-sm text-zinc-400">响应式预览区 - 切换设备类型查看不同尺寸下的效果</p>
      </div>
    </div>
  );
}

function PreviewRenderer({ codeExample }: { codeExample: string }) {
  // Simple heuristic to render representative elements
  if (codeExample.includes("<Button")) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
          默认按钮
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
          次要按钮
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
          幽灵按钮
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
          危险按钮
        </button>
      </div>
    );
  }

  if (codeExample.includes("<Badge") || codeExample.includes("Badge")) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">默认</span>
        <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">次要</span>
        <span className="inline-flex items-center rounded-md bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">成功</span>
        <span className="inline-flex items-center rounded-md bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white">警告</span>
        <span className="inline-flex items-center rounded-md bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">危险</span>
      </div>
    );
  }

  if (codeExample.includes("<Input") || codeExample.includes("placeholder=")) {
    return (
      <div className="w-full max-w-xs space-y-2">
        <input
          className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400"
          placeholder="请输入内容"
        />
      </div>
    );
  }

  if (codeExample.includes("avatar") || codeExample.includes("Avatar")) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-200 ring-2 ring-white flex items-center justify-center text-sm font-medium text-blue-700">
          AV
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium ring-2 ring-white">
          ZS
        </div>
        <div className="relative h-10 w-10 rounded-full bg-zinc-200 ring-2 ring-white">
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        </div>
      </div>
    );
  }

  if (codeExample.includes("progress") || codeExample.includes("Progress")) {
    return (
      <div className="w-48 space-y-2">
        <div className="flex justify-between text-sm">
          <span>完成进度</span><span>75%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full w-3/4 rounded-full bg-zinc-900 dark:bg-zinc-50 transition-all" />
        </div>
      </div>
    );
  }

  if (codeExample.includes("<Switch") || codeExample.includes("Switch")) {
    return (
      <div className="flex items-center space-x-2">
        <button className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-zinc-900 transition-colors dark:bg-zinc-50" role="switch" aria-checked={true}>
          <span className="pointer-events-none block h-5 w-5 translate-x-5 rounded-full bg-white shadow-lg dark:bg-zinc-950" />
        </button>
        <span className="text-sm">飞行模式</span>
      </div>
    );
  }

  if (codeExample.includes("<Card") || codeExample.includes("Card")) {
    return (
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="font-semibold leading-none tracking-tight">卡片标题</h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">卡片补充描述，展示卡片的基本结构。</p>
        <div className="mt-4 flex gap-2">
          <button className="inline-flex h-9 items-center rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white">确认</button>
          <button className="inline-flex h-9 items-center rounded-lg border px-3 text-xs font-medium">取消</button>
        </div>
      </div>
    );
  }

  if (codeExample.includes("<table") || codeExample.includes("table")) {
    return (
      <div className="w-full max-w-md overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-zinc-50 dark:bg-zinc-800">
            <th className="px-4 py-2.5 text-left font-medium">名称</th>
            <th className="px-4 py-2.5 text-left font-medium">状态</th>
            <th className="px-4 py-2.5 text-right font-medium">操作</th>
          </tr></thead>
          <tbody>
            <tr className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="px-4 py-2.5">项目A</td>
              <td className="px-4 py-2.5"><span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">完成</span></td>
              <td className="px-4 py-2.5 text-right"><button className="text-xs text-blue-600 hover:underline">编辑</button></td>
            </tr>
            <tr className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="px-4 py-2.5">项目B</td>
              <td className="px-4 py-2.5"><span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">进行中</span></td>
              <td className="px-4 py-2.5 text-right"><button className="text-xs text-blue-600 hover:underline">编辑</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (codeExample.includes("navigation") || codeExample.includes("Breadcrumb") || codeExample.includes("breadcrumb")) {
    return (
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <a className="hover:text-zinc-900">首页</a>
        <span>/</span>
        <a className="hover:text-zinc-900">组件</a>
        <span>/</span>
        <span className="font-medium text-zinc-900">Button</span>
      </nav>
    );
  }

  // Default: show a sample of the code itself
  return (
    <div className="text-center">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
          {compName(codeExample)}
        </span>
        <span className="inline-flex h-10 items-center rounded-lg border border-zinc-200 px-4 text-sm font-medium dark:border-zinc-700">
          Variant
        </span>
      </div>
    </div>
  );
}

function compName(code: string): string {
  const lines = code.split("\n");
  const first = lines[0].trim();
  return first.replace(/[<>/]/g, "").split(" ")[0] || "Component";
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
