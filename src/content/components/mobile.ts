import { ComponentMeta } from "@/lib/registry";

export const mobileComponents: ComponentMeta[] = [
  { name: "BottomSheet", category: "mobile", description: "底部弹出面板，从底部滑出的操作或内容面板。", platform: ["mobile"], tags: ["底部", "面板", "移动端", "弹出"], variants: ["default", "withHandle", "snapPoints"], accessibility: "使用 dialog role，拖拽手柄可操作", complexity: "medium", designTokens: { borderRadius: "1rem 1rem 0 0", maxHeight: "90vh" }, related: ["Drawer", "ActionSheet", "Sheet"], codeExample: `<div className="fixed inset-0 z-50 flex flex-col justify-end">
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  <div className="relative bg-white rounded-t-2xl p-4 animate-in slide-in-from-bottom">
    <div className="mx-auto w-10 h-1.5 rounded-full bg-zinc-300 mb-4" />
    <h2 className="text-lg font-semibold">底部面板</h2>
    {content}
  </div>
</div>` },
  { name: "ActionSheet", category: "mobile", description: "操作菜单，iOS 风格底部操作列表。", platform: ["mobile"], tags: ["操作", "菜单", "iOS", "移动端"], variants: ["default", "destructive", "withCancel"], accessibility: "使用 menu/listbox role", complexity: "simple", designTokens: { borderRadius: "0.875rem", itemHeight: "3.5rem" }, related: ["BottomSheet", "DropdownMenu", "ContextMenu"], codeExample: `<div className="fixed inset-x-0 bottom-0 z-50 p-3">
  <div className="rounded-2xl bg-white overflow-hidden mb-3 divide-y">
    {actions.map(action => (
      <button key={action} className="w-full py-4 text-center text-sm hover:bg-zinc-50">{action}</button>
    ))}
  </div>
  <button className="w-full rounded-2xl bg-white py-4 text-center text-sm font-semibold">取消</button>
</div>` },
  { name: "PullToRefresh", category: "mobile", description: "下拉刷新，向下拖动页面触发刷新。", platform: ["mobile"], tags: ["刷新", "下拉", "手势"], variants: ["default", "withIndicator", "customIcon"], accessibility: "刷新状态通过 aria-live 通知", complexity: "medium", designTokens: { threshold: "80px", indicatorHeight: "60px" }, related: ["InfiniteScroll", "RefreshControl", "ScrollArea"], codeExample: `<div className="relative" style={{transform: "translateY(40px)"}}>
  <div className="absolute left-1/2 -translate-x-1/2" style={{top: -60 + pullDistance}}>
    {isRefreshing ? <Loader2 className="animate-spin" /> : <ArrowDown />}
  </div>
  <div>{content}</div>
</div>` },
  { name: "SwipeAction", category: "mobile", description: "滑动操作，左右滑动列表项显示操作按钮。", platform: ["mobile"], tags: ["滑动", "操作", "手势"], variants: ["leftActions", "rightActions", "swipeToDelete"], accessibility: "操作按钮可聚焦，提供键盘替代方式", complexity: "complex", designTokens: { actionWidth: "80px", threshold: "60px" }, related: ["SwipeableRow", "ListItem", "DragDrop"], codeExample: `<div className="relative overflow-hidden">
  <div className="absolute right-0 h-full flex">
    <button className="w-20 h-full flex items-center justify-center bg-red-500 text-white text-sm">删除</button>
    <button className="w-20 h-full flex items-center justify-center bg-zinc-400 text-white text-sm">归档</button>
  </div>
  <div className="relative bg-white px-4 py-3" style={{transform: "translateX(-80px)"}}>
    {itemContent}
  </div>
</div>` },
  { name: "TouchRipple", category: "mobile", description: "触摸波纹，Material Design 风格的点击涟漪。", platform: ["mobile"], tags: ["触摸", "波纹", "反馈"], variants: ["default", "centered"], accessibility: "纯装饰效果", complexity: "medium", designTokens: { duration: "0.5s", opacity: "0.3" }, related: ["Ripple", "Button", "Pressable"], codeExample: `<button className="relative overflow-hidden rounded-full bg-zinc-900 text-white px-6 py-3">
  点击
  {ripples.map(r => (
    <span key={r.id} className="absolute rounded-full bg-white/30 animate-ripple-out" style={{left: r.x, top: r.y}} />
  ))}
</button>` },
  { name: "FloatingActionButton", category: "mobile", description: "悬浮操作按钮，浮动在页面右下角的圆形按钮。", platform: ["mobile"], tags: ["悬浮", "按钮", "浮动"], variants: ["default", "extended", "speedDial"], accessibility: "所有操作按钮可聚焦且有 aria-label", complexity: "simple", designTokens: { size: "3.5rem", borderRadius: "9999px", shadow: "0 4px 12px rgba(0,0,0,0.2)" }, related: ["Button", "ActionSheet", "IconButton"], codeExample: `<div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
  {expanded && (
    <>
      <button className="flex items-center gap-2 rounded-full bg-white shadow-lg px-4 py-2.5 text-sm" aria-label="编辑">✏️ <span>编辑</span></button>
      <button className="flex items-center gap-2 rounded-full bg-white shadow-lg px-4 py-2.5 text-sm" aria-label="分享">📤 <span>分享</span></button>
    </>
  )}
  <button className="h-14 w-14 rounded-full bg-zinc-900 text-white shadow-xl flex items-center justify-center" aria-label="更多操作" onClick={() => setExpanded(!expanded)}>
    {expanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
  </button>
</div>` },
  { name: "SlideGesture", category: "mobile", description: "滑动手势识别，识别左右滑动方向。", platform: ["mobile"], tags: ["手势", "滑动", "触摸"], variants: ["horizontal", "vertical", "withThreshold"], accessibility: "提供按钮替代手势操作", complexity: "complex", designTokens: { threshold: "50px", velocity: "0.5px/ms" }, related: ["SwipeAction", "Carousel", "Gallery"], codeExample: `<div
  className="overflow-hidden"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  <div className="flex transition-transform" style={{transform: "translateX(calc(-100% + 30px))"}}>
    {pages.map(p => <div key={p} className="w-full flex-shrink-0">{p}</div>)}
  </div>
</div>` },
  { name: "ShareSheet", category: "mobile", description: "分享面板，唤起系统分享或自定义分享渠道。", platform: ["mobile"], tags: ["分享", "社交", "移动端"], variants: ["default", "withPreview"], accessibility: "分享选项可聚焦导航", complexity: "medium", designTokens: { borderRadius: "1rem 1rem 0 0" }, related: ["BottomSheet", "ActionSheet", "ShareButton"], codeExample: `<div className="rounded-2xl bg-white p-6">
  <h3 className="text-lg font-semibold text-center mb-6">分享到</h3>
  <div className="grid grid-cols-4 gap-6">
    {channels.map(c => (
      <button key={c.name} className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-xl">{c.icon}</div>
        <span className="text-xs">{c.name}</span>
      </button>
    ))}
  </div>
</div>` },
  { name: "MobileSearch", category: "mobile", description: "移动端搜索，全屏搜索体验优化。", platform: ["mobile"], tags: ["搜索", "移动端", "全屏"], variants: ["default", "withHistory", "withSuggestions"], accessibility: "搜索输入自动聚焦，Escape/返回关闭", complexity: "medium", designTokens: { borderRadius: "0", fullScreen: true }, related: ["SearchInput", "CommandPalette", "Combobox"], codeExample: `<div className="fixed inset-0 z-50 bg-white">
  <div className="flex items-center gap-3 p-3 border-b">
    <Search className="h-5 w-5 text-zinc-400" />
    <input className="flex-1 text-lg focus:outline-none" placeholder="搜索..." autoFocus />
    <button className="text-sm text-blue-600" onClick={onClose}>取消</button>
  </div>
  <div className="p-4">
    <h4 className="text-xs font-semibold text-zinc-400 uppercase mb-3">搜索历史</h4>
    {history.map(h => <button key={h} className="block w-full text-left py-3 text-sm border-b">{h}</button>)}
  </div>
</div>` },
  { name: "PinchZoom", category: "mobile", description: "双指缩放，图片/内容的捏合缩放。", platform: ["mobile"], tags: ["手势", "缩放", "图片"], variants: ["default", "withControls"], accessibility: "提供缩放按钮作为手势替代", complexity: "complex", designTokens: { minScale: 1, maxScale: 5 }, related: ["Lightbox", "Gallery", "ImagePreview"], codeExample: `<div className="overflow-hidden touch-none" ref={containerRef}>
  <img src={src} className="transition-transform" style={{transform: "scale(1.5)"}} alt={alt} />
</div>` },
  { name: "CollapsibleHeader", category: "mobile", description: "可折叠头部，滚动时折叠/展开的顶部区域。", platform: ["mobile"], tags: ["头部", "折叠", "滚动"], variants: ["default", "withSearchBar", "withTabs"], accessibility: "折叠/展开不影响可访问性", complexity: "complex", designTokens: { maxHeight: "200px", minHeight: "56px" }, related: ["Header", "StickyHeader", "ScrollView"], codeExample: `<div className="sticky top-0 z-40 bg-white transition-all" style={{height: headerHeight}}>
  <div className="p-4">
    <h1 className="text-xl font-bold">页面标题</h1>
    <p className="text-sm text-zinc-500 mt-1">副标题</p>
  </div>
  {scrollY > 100 && (
    <div className="border-b">
      <TabsList>
        <TabsTrigger value="tab1">标签1</TabsTrigger>
        <TabsTrigger value="tab2">标签2</TabsTrigger>
      </TabsList>
    </div>
  )}
</div>` },
  { name: "BottomNavigation", category: "mobile", description: "底部导航，移动端主要页面切换。", platform: ["mobile"], tags: ["导航", "底部", "切换"], variants: ["default", "withBadge", "floating"], accessibility: "使用 nav 标签，当前项 aria-current='page'", complexity: "simple", designTokens: { height: "3.5rem", activeColor: "var(--primary)" }, related: ["TabBar", "Navigation", "Header"], codeExample: `<nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t flex items-center justify-around safe-area-bottom z-50">
  {items.map(item => (
    <div key={item.id} className="flex flex-col items-center gap-0.5 relative">
      <item.icon className={item.active ? "h-6 w-6 text-zinc-900" : "h-6 w-6 text-zinc-400"} />
      <span className="text-[10px]">{item.label}</span>
      {item.badge && <span className="absolute -top-1 -right-3 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">{item.badge}</span>}
    </div>
  ))}
</nav>` },
  { name: "StepperInput", category: "mobile", description: "步进输入，移动端优化的数量增减器。", platform: ["mobile"], tags: ["输入", "数量", "增减"], variants: ["default", "minimal", "cart"], accessibility: "增/减按钮有清晰的 aria-label", complexity: "simple", designTokens: { buttonSize: "2rem", borderRadius: "0.5rem" }, related: ["NumberInput", "Counter", "FormField"], codeExample: `<div className="inline-flex items-center rounded-lg border">
  <button className="h-10 w-10 flex items-center justify-center text-lg" aria-label="减少">−</button>
  <input className="w-14 h-10 text-center border-x text-sm font-medium" value={count} readOnly />
  <button className="h-10 w-10 flex items-center justify-center text-lg" aria-label="增加">+</button>
</div>` },
  { name: "SegmentPicker", category: "mobile", description: "滚轮选择器，iOS 风格滚动选择。", platform: ["mobile"], tags: ["选择", "滚轮", "iOS"], variants: ["date", "time", "custom"], accessibility: "提供输入框作为滚轮替代", complexity: "complex", designTokens: { itemHeight: "2.5rem", visibleItems: 5 }, related: ["Select", "DatePicker", "TimePicker"], codeExample: `<div className="flex justify-center h-48 overflow-hidden relative">
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 border-y bg-zinc-50/50 pointer-events-none" />
  <div className="overflow-auto snap-y snap-mandatory py-[72px] scrollbar-hide">
    {items.map(item => (
      <div key={item} className="h-10 flex items-center justify-center snap-center text-sm">{item}</div>
    ))}
  </div>
</div>` },
  { name: "SkeletonMobile", category: "mobile", description: "移动端骨架屏，移动端优化的加载占位。", platform: ["mobile"], tags: ["加载", "骨架", "移动端"], variants: ["list", "detail", "profile"], accessibility: "使用 aria-busy 标记加载区域", complexity: "simple", designTokens: { borderRadius: "0.5rem", pulseDuration: "2s" }, related: ["Skeleton", "LoadingState", "SkeletonLoader"], codeExample: `<div className="animate-pulse space-y-4 p-4">
  <div className="flex items-center gap-3">
    <div className="h-12 w-12 rounded-full bg-zinc-200" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 rounded bg-zinc-200" />
      <div className="h-3 w-2/3 rounded bg-zinc-200" />
    </div>
  </div>
  <div className="h-40 w-full rounded-xl bg-zinc-200" />
</div>` },
];
