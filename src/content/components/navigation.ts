import { ComponentMeta } from "@/lib/registry";

export const navigationComponents: ComponentMeta[] = [
  { name: "Breadcrumb", category: "navigation", description: "面包屑，展示页面层级路径。", platform: ["desktop", "tablet"], tags: ["导航", "路径", "层级"], variants: ["default", "withDropdown", "compact"], accessibility: "使用 nav aria-label='面包屑'，ol/li 语义", complexity: "simple", designTokens: { separator: "/", fontSize: "0.875rem" }, related: ["Link", "Navigation", "PageHeader"], codeExample: `<nav aria-label="面包屑">
  <ol className="flex items-center gap-1.5 text-sm text-zinc-500">
    <li><a href="/" className="hover:text-zinc-900">首页</a></li>
    <li>/</li>
    <li><a href="/components" className="hover:text-zinc-900">组件</a></li>
    <li>/</li>
    <li className="text-zinc-900 font-medium">Button</li>
  </ol>
</nav>` },
  { name: "Navbar", category: "navigation", description: "导航栏，顶部的全局导航。", platform: ["desktop", "mobile"], tags: ["导航", "顶栏", "全局"], variants: ["default", "sticky", "transparent", "withMegaMenu"], accessibility: "使用 nav 标签，当前页 aria-current='page'", complexity: "medium", designTokens: { height: "3.5rem", padding: "0 1.5rem" }, related: ["Header", "Sidebar", "TabBar"], codeExample: `<nav className="flex h-14 items-center justify-between border-b px-6 bg-white" aria-label="主导航">
  <div className="flex items-center gap-8">
    <Logo />
    <div className="flex gap-1">
      {items.map(item => (
        <a key={item.href} className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-100" aria-current={item.active ? 'page' : undefined}>{item.label}</a>
      ))}
    </div>
  </div>
</nav>` },
  { name: "DropdownMenu", category: "navigation", description: "下拉菜单，点击显示操作菜单。", platform: ["desktop"], tags: ["菜单", "下拉", "操作"], variants: ["default", "withIcon", "withShortcut", "submenu"], accessibility: "使用 menu/menuitem role，方向键导航", complexity: "medium", designTokens: { borderRadius: "0.5rem", itemPadding: "0.5rem 0.75rem" }, related: ["ContextMenu", "Select", "CommandPalette"], codeExample: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">操作 <ChevronDown className="ml-1 h-4 w-4" /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem>复制</DropdownMenuItem>
    <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>` },
  { name: "ContextMenu", category: "navigation", description: "右键菜单，鼠标右键触发的上下文操作。", platform: ["desktop"], tags: ["菜单", "右键", "上下文"], variants: ["default", "withIcons", "nested"], accessibility: "使用 menu role，支持键盘 Shift+F10 触发", complexity: "medium", designTokens: { borderRadius: "0.5rem", minWidth: "10rem" }, related: ["DropdownMenu", "Menu", "ActionMenu"], codeExample: `<div onContextMenu={handleContextMenu} className="rounded-lg border p-12 text-center text-sm text-zinc-500">
  在此区域右键点击
  {contextMenu && (
    <div className="fixed z-50 rounded-lg border bg-white shadow-lg p-1" style={{top: y, left: x}}>
      <button className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100">剪切</button>
      <button className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100">复制</button>
    </div>
  )}
</div>` },
  { name: "MegaMenu", category: "navigation", description: "大型菜单，展示多列内容的面板式下拉。", platform: ["desktop"], tags: ["菜单", "导航", "大型"], variants: ["default", "withFeatured"], accessibility: "使用 menubar 模式，子菜单使用 menu role", complexity: "complex", designTokens: { borderRadius: "0.5rem", maxWidth: "40rem" }, related: ["DropdownMenu", "Navbar", "Navigation"], codeExample: `<div className="absolute z-50 mt-2 rounded-xl border bg-white shadow-xl p-6 grid grid-cols-3 gap-8 w-[600px]">
  <div>
    <h4 className="text-xs font-semibold uppercase text-zinc-400 mb-3">产品</h4>
    <ul className="space-y-2">{productLinks.map(l => <li key={l}><a className="text-sm hover:text-zinc-900">{l}</a></li>)}</ul>
  </div>
  <div>
    <h4 className="text-xs font-semibold uppercase text-zinc-400 mb-3">资源</h4>
    <ul className="space-y-2">{resourceLinks.map(l => <li key={l}><a className="text-sm hover:text-zinc-900">{l}</a></li>)}</ul>
  </div>
  <div className="rounded-lg bg-zinc-50 p-4">
    <p className="text-sm font-medium">精选内容</p>
    <p className="text-xs text-zinc-500 mt-1">推荐内容描述</p>
  </div>
</div>` },
  { name: "TabBar", category: "navigation", description: "标签栏，底部切换不同页面视图（移动端常用）。", platform: ["mobile"], tags: ["导航", "底部", "标签"], variants: ["default", "withBadge", "floating"], accessibility: "使用 tablist role，当前页 aria-selected='true'", complexity: "simple", designTokens: { height: "3.5rem", iconSize: "1.5rem" }, related: ["Tabs", "BottomNav", "Navigation"], codeExample: `<nav className="fixed bottom-0 left-0 right-0 h-16 border-t bg-white flex items-center justify-around" role="tablist">
  {tabs.map(tab => (
    <button key={tab.id} role="tab" aria-selected={tab.active} className="flex flex-col items-center gap-1 text-xs text-zinc-400 aria-[selected=true]:text-zinc-900">
      <tab.icon className="h-6 w-6" />
      {tab.label}
    </button>
  ))}
</nav>` },
  { name: "SegmentedControl", category: "navigation", description: "分段控件，在多个选项间切换。", platform: ["desktop", "mobile"], tags: ["切换", "分段", "选择"], variants: ["default", "withIcon", "fullWidth"], accessibility: "使用 radiogroup 或 tablist role", complexity: "simple", designTokens: { height: "2.25rem", borderRadius: "0.5rem" }, related: ["Tabs", "Switch", "RadioGroup"], codeExample: `<div className="inline-flex rounded-lg bg-zinc-100 p-1" role="radiogroup">
  {options.map(opt => (
    <button key={opt} className="px-4 py-1.5 text-sm rounded-md aria-[checked=true]:bg-white aria-[checked=true]:shadow" role="radio" aria-checked={selected === opt}>
      {opt}
    </button>
  ))}
</div>` },
  { name: "VerticalNav", category: "navigation", description: "垂直导航，侧边的层级导航菜单。", platform: ["desktop"], tags: ["导航", "垂直", "侧边"], variants: ["default", "collapsible", "withSubmenu"], accessibility: "使用 nav 标签和 list 语义，当前项 aria-current", complexity: "medium", designTokens: { itemHeight: "2.25rem", indent: "1rem" }, related: ["Sidebar", "TreeView", "Navigation"], codeExample: `<nav className="space-y-1">
  <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase">导航</div>
  {items.map(item => (
    <a key={item.id} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 aria-[current]:bg-zinc-100 aria-[current]:font-medium" aria-current={item.active}>
      <item.icon className="h-4 w-4" />
      {item.label}
    </a>
  ))}
</nav>` },
  { name: "CommandPalette", category: "navigation", description: "命令面板，快捷键唤起的全局搜索和命令执行器。", platform: ["desktop"], tags: ["搜索", "命令", "快捷键"], variants: ["default", "withActions", "withRecent"], accessibility: "使用 dialog+combobox role，⌘K 唤起，Esc 关闭", complexity: "complex", designTokens: { borderRadius: "0.75rem", maxWidth: "32rem" }, related: ["SearchInput", "DropdownMenu", "Combobox"], codeExample: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="p-0 max-w-xl">
    <div className="flex items-center border-b px-4">
      <Search className="h-4 w-4 text-zinc-400 mr-2" />
      <Input className="border-0 focus-visible:ring-0 text-lg h-14" placeholder="搜索命令..." />
    </div>
    <div className="p-2">
      {results.map(r => (
        <button key={r.id} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-zinc-100">
          <r.icon className="h-4 w-4 text-zinc-500" />
          <span>{r.label}</span>
          <kbd className="ml-auto text-xs text-zinc-400">{r.shortcut}</kbd>
        </button>
      ))}
    </div>
  </DialogContent>
</Dialog>` },
  { name: "Stepper", category: "navigation", description: "步骤条，展示多步流程的进度。", platform: ["desktop", "mobile", "tablet"], tags: ["步骤", "流程", "进度"], variants: ["horizontal", "vertical", "clickable"], accessibility: "使用 ol/li 语义，当前步骤 aria-current='step'", complexity: "medium", designTokens: { stepSize: "2rem", connectorWidth: "2px" }, related: ["Wizard", "Tabs", "ProgressSteps"], codeExample: `<ol className="flex items-center">
  {steps.map((step, i) => (
    <li key={i} className="flex items-center flex-1">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-medium" aria-current="step">{i+1}</span>
        <span className="text-sm font-medium">{step}</span>
      </div>
      {i < steps.length - 1 && <div className="flex-1 mx-4 h-px bg-zinc-200" />}
    </li>
  ))}
</ol>` },
  { name: "BackToTop", category: "navigation", description: "回到顶部，长页面滚回顶部的快捷按钮。", platform: ["desktop", "mobile"], tags: ["导航", "滚动", "顶部"], variants: ["default", "withProgress"], accessibility: "使用 button，aria-label='回到顶部'", complexity: "simple", designTokens: { size: "2.5rem", borderRadius: "9999px" }, related: ["ScrollArea", "Anchor", "Navigation"], codeExample: `<button
  className="fixed bottom-8 right-8 h-10 w-10 rounded-full bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 transition-all"
  aria-label="回到顶部"
  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
>
  <ArrowUp className="h-5 w-5 mx-auto" />
</button>` },
];
