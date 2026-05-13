import { ComponentMeta } from "@/lib/registry";

export const layoutComponents: ComponentMeta[] = [
  { name: "Container", category: "layout", description: "页面容器，限定最大宽度并水平居中。", platform: ["desktop", "tablet"], tags: ["布局", "容器", "居中"], variants: ["sm", "md", "lg", "xl", "fluid"], accessibility: "使用 main 或 section 语义标签", complexity: "simple", designTokens: { maxWidth: "1280px", padding: "1rem" }, related: ["Grid", "Section", "PageLayout"], codeExample: `<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>` },
  { name: "Grid", category: "layout", description: "栅格系统，12列响应式布局。", platform: ["desktop", "mobile", "tablet"], tags: ["布局", "栅格", "响应式"], variants: ["2col", "3col", "4col", "masonry"], accessibility: "使用 CSS Grid，DOM 顺序与视觉顺序一致", complexity: "simple", designTokens: { gap: "1rem", columns: 12 }, related: ["Container", "Flex", "CardGrid"], codeExample: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</div>` },
  { name: "Flex", category: "layout", description: "弹性布局容器，控制子元素排列方向和对齐。", platform: ["desktop", "mobile", "tablet"], tags: ["布局", "弹性", "对齐"], variants: ["row", "column", "wrap", "center"], accessibility: "默认 behavior，无需额外增强", complexity: "simple", designTokens: { gap: "0.5rem" }, related: ["Grid", "Stack", "Container"], codeExample: `<div className="flex items-center justify-between gap-4">
  <div>左侧</div>
  <div className="flex items-center gap-2">
    <Button>操作</Button>
    <Button variant="outline">取消</Button>
  </div>
</div>` },
  { name: "Stack", category: "layout", description: "堆叠布局，统一控制子元素间距。", platform: ["desktop", "mobile", "tablet"], tags: ["布局", "间距", "堆叠"], variants: ["horizontal", "vertical"], accessibility: "无需额外增强", complexity: "simple", designTokens: { gap: "0.75rem" }, related: ["Flex", "Spacer", "Section"], codeExample: `<div className="space-y-4">
  <Card>第一项</Card>
  <Card>第二项</Card>
  <Card>第三项</Card>
</div>` },
  { name: "Section", category: "layout", description: "页面区域分隔，包含标题和内容区。", platform: ["desktop", "mobile", "tablet"], tags: ["布局", "区域", "标题"], variants: ["default", "withAction", "collapsible"], accessibility: "使用 section 元素和 heading", complexity: "simple", designTokens: { gap: "1rem", padding: "1.5rem" }, related: ["Card", "Container", "PageLayout"], codeExample: `<section className="py-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">区域标题</h2>
    <Button variant="ghost" size="sm">查看更多</Button>
  </div>
  <div className="grid grid-cols-3 gap-4">
    {children}
  </div>
</section>` },
  { name: "PageLayout", category: "layout", description: "页面整体布局，包含侧边栏、顶栏和内容区。", platform: ["desktop"], tags: ["布局", "页面", "侧边栏"], variants: ["sidebar", "header", "both", "fullScreen"], accessibility: "使用 header/nav/main/footer 语义标签，skip-link", complexity: "complex", designTokens: { sidebarWidth: "16rem", headerHeight: "3.5rem" }, related: ["Container", "Sidebar", "Header", "Footer"], codeExample: `<div className="min-h-screen flex">
  <aside className="w-64 border-r bg-zinc-50">{sidebar}</aside>
  <div className="flex-1">
    <header className="h-14 border-b px-6">{header}</header>
    <main className="p-6">{children}</main>
  </div>
</div>` },
  { name: "SplitPane", category: "layout", description: "可拖拽分割面板，两栏可调整大小。", platform: ["desktop"], tags: ["布局", "分割", "拖拽", "面板"], variants: ["horizontal", "vertical"], accessibility: "分隔条使用 separator role，支持键盘调整", complexity: "medium", designTokens: { dividerWidth: "4px", minSize: "200px" }, related: ["ResizablePanel", "PageLayout"], codeExample: `<div className="flex h-full">
  <div className="w-1/3 min-w-[200px] border-r">{left}</div>
  <div className="w-1 cursor-col-resize bg-zinc-200 hover:bg-zinc-300 active:bg-blue-500" role="separator" tabIndex={0} />
  <div className="flex-1">{right}</div>
</div>` },
  { name: "ResizablePanel", category: "layout", description: "可调整大小的面板，支持拖拽边缘。", platform: ["desktop"], tags: ["布局", "调整", "拖拽"], variants: ["right", "bottom", "left"], accessibility: "调整手柄设置 aria-label 和键盘操作", complexity: "medium", designTokens: { handleSize: "4px", minSize: "150px" }, related: ["SplitPane", "Drawer", "Panel"], codeExample: `<div className="relative" style={{width: panelWidth}}>
  {content}
  <div className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize bg-zinc-200 hover:bg-blue-500 transition-colors"
    role="separator" aria-label="拖动调整面板宽度" tabIndex={0} />
</div>` },
  { name: "Tabs", category: "layout", description: "标签页，在同一区域切换不同内容视图。", platform: ["desktop", "mobile", "tablet"], tags: ["导航", "切换", "标签"], variants: ["line", "pills", "card"], accessibility: "使用 tablist/tab/tabpanel 角色，键盘左右切换", complexity: "simple", designTokens: { tabPadding: "0.5rem 1rem", indicatorHeight: "2px" }, related: ["SegmentedControl", "TabBar", "Wizard"], codeExample: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">账户</TabsTrigger>
    <TabsTrigger value="password">密码</TabsTrigger>
    <TabsTrigger value="billing">账单</TabsTrigger>
  </TabsList>
  <TabsContent value="account">{accountContent}</TabsContent>
  <TabsContent value="password">{passwordContent}</TabsContent>
</Tabs>` },
  { name: "Accordion", category: "layout", description: "手风琴，可展开/折叠的内容区域。", platform: ["desktop", "mobile", "tablet"], tags: ["折叠", "展开", "内容"], variants: ["single", "multiple", "bordered"], accessibility: "使用 disclosure 模式，aria-expanded 控制状态", complexity: "simple", designTokens: { borderRadius: "0.5rem", headerPadding: "1rem" }, related: ["Collapse", "Section", "FAQ"], codeExample: `<div className="divide-y border rounded-lg">
  {items.map(item => (
    <details key={item.id} className="group">
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-zinc-50">
        {item.title}
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4">{item.content}</div>
    </details>
  ))}
</div>` },
  { name: "Wizard", category: "layout", description: "步骤向导，引导用户完成多步操作。", platform: ["desktop", "mobile"], tags: ["步骤", "向导", "流程"], variants: ["horizontal", "vertical", "withIcon"], accessibility: "当前步骤使用 aria-current='step'，完成步骤使用 aria-label", complexity: "medium", designTokens: { stepSize: "2rem", connectorWidth: "2px" }, related: ["Tabs", "Stepper", "MultiStepForm"], codeExample: `<div className="flex items-center gap-2">
  {steps.map((step, i) => (
    <>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-medium">{i+1}</div>
        <span className="text-sm font-medium">{step}</span>
      </div>
      {i < steps.length - 1 && <div className="flex-1 h-px bg-zinc-200" />}
    </>
  ))}
</div>` },
  { name: "EmptyState", category: "layout", description: "空状态占位，无数据时展示提示和操作引导。", platform: ["desktop", "mobile", "tablet"], tags: ["空状态", "占位", "引导"], variants: ["default", "withAction", "compact"], accessibility: "使用 status role，操作按钮可聚焦", complexity: "simple", designTokens: { padding: "3rem", iconSize: "3rem" }, related: ["LoadingState", "ErrorState", "Skeleton"], codeExample: `<div className="flex flex-col items-center justify-center py-16 text-center">
  <Inbox className="h-12 w-12 text-zinc-300" />
  <h3 className="mt-4 text-lg font-semibold">暂无数据</h3>
  <p className="mt-1 text-sm text-zinc-500">开始创建第一条记录吧</p>
  <Button className="mt-4">创建</Button>
</div>` },
  { name: "ErrorState", category: "layout", description: "错误状态，显示错误信息和重试操作。", platform: ["desktop", "mobile", "tablet"], tags: ["错误", "状态", "重试"], variants: ["default", "inline", "fullPage"], accessibility: "使用 alert role，错误信息可读", complexity: "simple", designTokens: { padding: "2rem" }, related: ["EmptyState", "Toast", "Alert"], codeExample: `<div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
  <AlertTriangle className="h-12 w-12 text-red-400" />
  <h3 className="mt-4 text-lg font-semibold">加载失败</h3>
  <p className="mt-1 text-sm text-zinc-500">请检查网络连接后重试</p>
  <Button variant="outline" className="mt-4">
    <RefreshCw className="mr-2 h-4 w-4" /> 重试
  </Button>
</div>` },
  { name: "Sidebar", category: "layout", description: "侧边栏，固定左侧或右侧的导航面板。", platform: ["desktop"], tags: ["导航", "侧边栏", "布局"], variants: ["default", "collapsible", "floating"], accessibility: "使用 nav 标签，aria-label 描述导航用途", complexity: "medium", designTokens: { width: "16rem", backgroundColor: "#fafafa" }, related: ["PageLayout", "Drawer", "Navigation"], codeExample: `<aside className="fixed left-0 top-0 h-screen w-64 border-r bg-zinc-50 p-4">
  <nav className="space-y-1">
    {menuItems.map(item => (
      <a key={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-zinc-200">{item.label}</a>
    ))}
  </nav>
</aside>` },
  { name: "Header", category: "layout", description: "顶部导航栏，包含Logo、导航和操作区。", platform: ["desktop", "mobile", "tablet"], tags: ["导航", "顶栏", "布局"], variants: ["default", "transparent", "withSearch"], accessibility: "使用 header/banner 语义标签", complexity: "medium", designTokens: { height: "3.5rem", padding: "0 1.5rem" }, related: ["Sidebar", "PageLayout", "Footer"], codeExample: `<header className="sticky top-0 z-50 h-14 border-b bg-white/80 backdrop-blur-sm">
  <div className="flex h-full items-center justify-between px-6">
    <div className="flex items-center gap-4">
      <Logo />
      <nav className="flex gap-1">
        {navItems.map(item => <Button key={item} variant="ghost" size="sm">{item}</Button>)}
      </nav>
    </div>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Avatar />
    </div>
  </div>
</header>` },
  { name: "Footer", category: "layout", description: "页脚，放置版权、链接和社交信息。", platform: ["desktop", "mobile", "tablet"], tags: ["页脚", "布局", "链接"], variants: ["simple", "withLinks", "withNewsletter"], accessibility: "使用 footer/contentinfo 语义标签", complexity: "simple", designTokens: { padding: "2rem", borderTop: "1px solid var(--border)" }, related: ["Header", "PageLayout", "Section"], codeExample: `<footer className="border-t py-12">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid grid-cols-4 gap-8">
      <div>
        <h4 className="text-sm font-semibold mb-3">产品</h4>
        <ul className="space-y-2 text-sm text-zinc-500">{links}</ul>
      </div>
    </div>
    <div className="mt-8 border-t pt-6 text-center text-sm text-zinc-400">
      &copy; 2026 UI Reference Hub
    </div>
  </div>
</footer>` },
  { name: "Card", category: "layout", description: "卡片容器，用于分组和展示关联内容。", platform: ["desktop", "mobile", "tablet"], tags: ["卡片", "容器", "分组"], variants: ["default", "hover", "interactive", "compact"], accessibility: "可交互卡片使用 button 或 a 元素", complexity: "simple", designTokens: { borderRadius: "0.75rem", padding: "1.5rem", shadow: "0 1px 3px rgba(0,0,0,0.1)" }, related: ["CardGrid", "Section", "Panel"], codeExample: `<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片补充描述</CardDescription>
  </CardHeader>
  <CardContent>{content}</CardContent>
  <CardFooter className="flex gap-2">
    <Button size="sm">确认</Button>
    <Button size="sm" variant="ghost">取消</Button>
  </CardFooter>
</Card>` },
  { name: "Panel", category: "layout", description: "面板，可展开/折叠的内容区域。", platform: ["desktop"], tags: ["面板", "折叠", "区域"], variants: ["default", "collapsible", "draggable"], accessibility: "折叠按钮设置 aria-expanded/aria-controls", complexity: "medium", designTokens: { borderRadius: "0.5rem", headerHeight: "2.5rem" }, related: ["Card", "Accordion", "Drawer"], codeExample: `<div className="rounded-lg border">
  <div className="flex items-center justify-between border-b px-4 py-2 bg-zinc-50">
    <span className="text-sm font-medium">面板标题</span>
    <Button variant="ghost" size="icon"><Minus className="h-4 w-4" /></Button>
  </div>
  <div className="p-4">{content}</div>
</div>` },
  { name: "Drawer", category: "layout", description: "抽屉，从屏幕边缘滑出的面板。", platform: ["desktop", "mobile"], tags: ["面板", "滑出", "侧边"], variants: ["left", "right", "bottom", "top"], accessibility: "打开时焦点移入 Drawer，关闭后移回触发元素", complexity: "medium", designTokens: { width: "24rem", borderRadius: "0" }, related: ["Modal", "Sheet", "Sidebar"], codeExample: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">打开抽屉</Button>
  </DialogTrigger>
  <DialogContent className="fixed right-0 top-0 h-full w-96 rounded-none translate-x-0 translate-y-0">
    <DialogHeader><DialogTitle>抽屉标题</DialogTitle></DialogHeader>
    {content}
  </DialogContent>
</Dialog>` },
  { name: "Spacer", category: "layout", description: "间距组件，在元素间添加统一空白。", platform: ["desktop", "mobile", "tablet"], tags: ["间距", "空白", "布局"], variants: ["xs", "sm", "md", "lg", "xl"], accessibility: "纯视觉组件，无特殊要求", complexity: "simple", designTokens: { sizes: "0.25rem-2rem" }, related: ["Stack", "Divider", "Flex"], codeExample: `<div className="flex items-center">
  <Button>按钮1</Button>
  <Spacer size="md" />
  <Button>按钮2</Button>
</div>` },
];
