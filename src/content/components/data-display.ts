import { ComponentMeta } from "@/lib/registry";

export const dataDisplayComponents: ComponentMeta[] = [
  { name: "Table", category: "data-display", description: "数据表格，支持排序、筛选、分页和行选择。", platform: ["desktop", "tablet"], tags: ["表格", "数据", "排序"], variants: ["default", "striped", "bordered", "compact"], accessibility: "使用 table 语义标签，th scope 正确设置", complexity: "medium", designTokens: { cellPadding: "0.75rem 1rem", fontSize: "0.875rem" }, related: ["DataGrid", "Pagination", "TableRow"], codeExample: `<table className="w-full text-sm">
  <thead><tr className="border-b bg-zinc-50">
    <th className="px-4 py-3 text-left font-medium">名称</th>
    <th className="px-4 py-3 text-left font-medium">状态</th>
    <th className="px-4 py-3 text-right font-medium">操作</th>
  </tr></thead>
  <tbody>
    {data.map(row => (
      <tr key={row.id} className="border-b hover:bg-zinc-50">
        <td className="px-4 py-3">{row.name}</td>
        <td className="px-4 py-3"><Badge>{row.status}</Badge></td>
        <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">编辑</Button></td>
      </tr>
    ))}
  </tbody>
</table>` },
  { name: "DataGrid", category: "data-display", description: "数据网格，功能丰富的数据表格含排序/筛选/拖拽列。", platform: ["desktop"], tags: ["表格", "数据", "高级"], variants: ["default", "virtualized", "treeData"], accessibility: "复杂表格使用 grid role，键盘导航遵循 ARIA Grid Pattern", complexity: "complex", designTokens: { cellPadding: "0.5rem 0.75rem", headerHeight: "2.5rem" }, related: ["Table", "VirtualList", "Pagination"], codeExample: `<div role="grid" aria-label="数据表格" className="border rounded-lg overflow-hidden">
  <div role="rowgroup" className="bg-zinc-50 border-b">
    <div role="row" className="flex">
      <div role="columnheader" className="flex-1 px-4 py-3 text-sm font-medium">名称</div>
      <div role="columnheader" className="w-24 px-4 py-3 text-sm font-medium">状态</div>
    </div>
  </div>
  <div role="rowgroup">
    {rows.map(row => (
      <div role="row" key={row.id} className="flex border-b hover:bg-zinc-50">
        <div role="gridcell" className="flex-1 px-4 py-3 text-sm">{row.name}</div>
        <div role="gridcell" className="w-24 px-4 py-3 text-sm">{row.status}</div>
      </div>
    ))}
  </div>
</div>` },
  { name: "Pagination", category: "data-display", description: "分页器，表格或列表数据的分页导航。", platform: ["desktop", "mobile"], tags: ["分页", "导航", "数据"], variants: ["default", "simple", "withSizeChanger"], accessibility: "使用 nav aria-label='分页'，当前页 aria-current='page'", complexity: "medium", designTokens: { buttonSize: "2rem", borderRadius: "0.375rem" }, related: ["Table", "InfiniteScroll", "DataGrid"], codeExample: `<nav aria-label="分页" className="flex items-center justify-between">
  <p className="text-sm text-zinc-500">共 {total} 条</p>
  <div className="flex items-center gap-1">
    <button className="h-8 w-8 rounded border" aria-label="上一页">‹</button>
    {[1,2,3,4,5].map(p => (
      <button key={p} className="h-8 w-8 rounded border aria-[current]:bg-zinc-900 aria-[current]:text-white" aria-current={p === 1}>{p}</button>
    ))}
    <button className="h-8 w-8 rounded border" aria-label="下一页">›</button>
  </div>
</nav>` },
  { name: "InfiniteScroll", category: "data-display", description: "无限滚动，滚动到底自动加载更多。", platform: ["desktop", "mobile"], tags: ["滚动", "加载", "列表"], variants: ["default", "virtualized"], accessibility: "加载状态通过 aria-live 通知，提供'加载更多'按钮备用", complexity: "medium", designTokens: { threshold: "200px" }, related: ["VirtualList", "Pagination", "List"], codeExample: `<div className="h-96 overflow-auto" onScroll={handleScroll}>
  {items.map(item => <div key={item.id} className="p-4 border-b">{item.name}</div>)}
  {isLoading && <div className="py-4 text-center text-sm text-zinc-500">加载中...</div>}
  {!hasMore && <div className="py-4 text-center text-sm text-zinc-400">没有更多了</div>}
</div>` },
  { name: "List", category: "data-display", description: "列表，垂直排列数据项。", platform: ["desktop", "mobile", "tablet"], tags: ["列表", "数据", "排列"], variants: ["default", "withIcon", "withAction", "compact"], accessibility: "使用 ul/li 语义标签", complexity: "simple", designTokens: { itemPadding: "0.75rem 1rem", gap: "0" }, related: ["Table", "CardList", "DropdownMenu"], codeExample: `<ul className="divide-y">
  {items.map(item => (
    <li key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50">
      <div className="flex items-center gap-3">
        <Avatar />
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-zinc-500">{item.email}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">操作</Button>
    </li>
  ))}
</ul>` },
  { name: "CardList", category: "data-display", description: "卡片列表，用卡片展示数据项集合。", platform: ["desktop", "mobile", "tablet"], tags: ["卡片", "列表", "数据"], variants: ["grid", "list", "masonry"], accessibility: "使用列表语义或 article 包裹每张卡片", complexity: "simple", designTokens: { gap: "1rem", cardPadding: "1rem" }, related: ["Card", "Grid", "List"], codeExample: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent className="p-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
      </CardContent>
    </Card>
  ))}
</div>` },
  { name: "TreeView", category: "data-display", description: "树形控件，展示层级结构和可展开/折叠的节点。", platform: ["desktop"], tags: ["树", "层级", "展开"], variants: ["default", "withCheckbox", "withIcon"], accessibility: "使用 tree/treeitem role，方向键导航节点", complexity: "complex", designTokens: { indent: "1.5rem", nodeHeight: "2rem" }, related: ["Accordion", "Menu", "FileExplorer"], codeExample: `<ul role="tree" className="space-y-0">
  <li role="treeitem" aria-expanded="true">
    <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-100 rounded w-full text-left text-sm">
      <ChevronRight className="h-3.5 w-3.5 transition-transform rotate-90" />
      <Folder className="h-4 w-4" />
      文件夹
    </button>
    <ul role="group" className="ml-6">
      <li role="treeitem">
        <button className="flex items-center gap-2 px-2 py-1.5 text-sm"><File className="h-4 w-4" /> 文件1</button>
      </li>
    </ul>
  </li>
</ul>` },
  { name: "Timeline", category: "data-display", description: "时间轴，按时间顺序展示事件。", platform: ["desktop", "mobile", "tablet"], tags: ["时间", "时间轴", "事件"], variants: ["vertical", "horizontal", "alternating"], accessibility: "使用 list 语义，每个事件用 time 元素标注时间", complexity: "simple", designTokens: { lineWidth: "2px", dotSize: "0.75rem" }, related: ["List", "Steps", "ActivityLog"], codeExample: `<ol className="relative border-l-2 border-zinc-200 ml-3 space-y-6">
  {events.map(event => (
    <li key={event.id} className="ml-6">
      <span className="absolute -left-[11px] h-4 w-4 rounded-full border-2 border-zinc-900 bg-white" />
      <time className="text-xs text-zinc-400">{event.time}</time>
      <h3 className="text-sm font-medium mt-0.5">{event.title}</h3>
      <p className="text-sm text-zinc-500">{event.desc}</p>
    </li>
  ))}
</ol>` },
  { name: "StatCard", category: "data-display", description: "统计卡片，展示关键指标和趋势。", platform: ["desktop", "mobile", "tablet"], tags: ["统计", "指标", "仪表盘"], variants: ["default", "withTrend", "withChart"], accessibility: "数字使用合适的格式，趋势变化用 aria-label 说明", complexity: "simple", designTokens: { borderRadius: "0.75rem", padding: "1.25rem" }, related: ["Card", "Chart", "Dashboard"], codeExample: `<div className="grid grid-cols-4 gap-4">
  <Card>
    <CardContent className="p-5">
      <p className="text-sm text-zinc-500">总收入</p>
      <p className="text-2xl font-bold mt-1">¥128,450</p>
      <p className="flex items-center gap-1 text-xs text-green-600 mt-2">
        <TrendingUp className="h-3 w-3" /> +12.5%
      </p>
    </CardContent>
  </Card>
</div>` },
  { name: "TagList", category: "data-display", description: "标签列表，展示一组标签或分类。", platform: ["desktop", "mobile", "tablet"], tags: ["标签", "分类", "筛选"], variants: ["default", "clickable", "removable"], accessibility: "可点击标签使用 button 元素", complexity: "simple", designTokens: { gap: "0.5rem", tagRadius: "9999px" }, related: ["Badge", "Chip", "TagInput"], codeExample: `<div className="flex flex-wrap gap-2">
  {tags.map(tag => (
    <span key={tag} className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium hover:bg-zinc-200 cursor-pointer transition-colors">
      {tag}
    </span>
  ))}
</div>` },
  { name: "Progress", category: "data-display", description: "进度条，展示任务完成度。", platform: ["desktop", "mobile", "tablet"], tags: ["进度", "状态", "加载"], variants: ["linear", "circular", "withLabel", "steps"], accessibility: "使用 progressbar role，aria-valuenow/aria-valuemin/aria-valuemax", complexity: "simple", designTokens: { height: "0.5rem", borderRadius: "9999px" }, related: ["ProgressSteps", "LoadingState", "Slider"], codeExample: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>完成进度</span><span>75%</span>
  </div>
  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
    <div className="h-full w-3/4 rounded-full bg-zinc-900 transition-all" />
  </div>
</div>` },
  { name: "CircularProgress", category: "data-display", description: "环形进度，用圆环展示进度或百分比。", platform: ["desktop", "mobile", "tablet"], tags: ["进度", "圆形", "百分比"], variants: ["default", "withLabel", "dashboard"], accessibility: "使用 progressbar role 或 img+alt", complexity: "medium", designTokens: { size: "4rem", strokeWidth: "4" }, related: ["Progress", "Chart", "StatCard"], codeExample: `<div className="relative h-16 w-16">
  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e5e5" strokeWidth="4" />
    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#18181b" strokeWidth="4"
      strokeDasharray="97.4" strokeDashoffset={97.4 * (1 - percent/100)} strokeLinecap="round" />
  </svg>
  <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{percent}%</span>
</div>` },
  { name: "Sparkline", category: "data-display", description: "迷你图表，在狭小空间展示数据趋势。", platform: ["desktop", "mobile"], tags: ["图表", "趋势", "迷你"], variants: ["line", "bar", "area"], accessibility: "提供文本替代描述数据趋势", complexity: "medium", designTokens: { height: "2rem", width: "6rem" }, related: ["Chart", "StatCard", "TrendIndicator"], codeExample: `<svg className="h-8 w-24" viewBox="0 0 100 30">
  <polyline fill="none" stroke="#18181b" strokeWidth="2" points={points} />
</svg>` },
  { name: "Chart", category: "data-display", description: "图表，柱状图、折线图、饼图等数据可视化。", platform: ["desktop", "tablet"], tags: ["图表", "可视化", "数据"], variants: ["bar", "line", "pie", "area", "donut"], accessibility: "提供数据表格作为替代，图表使用适当的 aria 属性", complexity: "complex", designTokens: { borderRadius: "0.75rem", padding: "1rem" }, related: ["Sparkline", "StatCard", "Dashboard"], codeExample: `<div className="rounded-xl border p-6">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-sm font-semibold">月度统计</h3>
    <Select><SelectTrigger className="w-24"><SelectValue placeholder="2026" /></SelectTrigger></Select>
  </div>
  <div className="flex items-end justify-between gap-2 h-48">
    {data.map((item, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-2">
        <div className="w-full bg-zinc-900 rounded-t transition-all" style={{height: "75%"}} />
        <span className="text-xs text-zinc-400">{item.label}</span>
      </div>
    ))}
  </div>
</div>` },
  { name: "Carousel", category: "data-display", description: "轮播，循环展示图片或内容卡片。", platform: ["desktop", "mobile", "tablet"], tags: ["轮播", "滑动", "展示"], variants: ["default", "thumbnail", "fade"], accessibility: "使用 carousel role 或 tabpanel，支持键盘导航，自动播放可暂停", complexity: "medium", designTokens: { borderRadius: "0.75rem", aspectRatio: "16/9" }, related: ["Gallery", "Slider", "CardList"], codeExample: `<div className="relative overflow-hidden rounded-xl" role="region" aria-label="图片轮播">
  <div className="flex transition-transform" style={{transform: "translateX(-100%)"}}>
    {slides.map(slide => (
      <div key={slide.id} className="w-full flex-shrink-0 aspect-video bg-zinc-100 flex items-center justify-center">
        {slide.content}
      </div>
    ))}
  </div>
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    {slides.map((_, i) => <button key={i} className="h-2 w-2 rounded-full bg-white/70 aria-[current]:bg-white" aria-current={i === current} />)}
  </div>
</div>` },
  { name: "Gallery", category: "data-display", description: "图片画廊，网格布局展示图片集。", platform: ["desktop", "mobile", "tablet"], tags: ["图片", "画廊", "展示"], variants: ["grid", "masonry", "justified"], accessibility: "每张图提供有意义的 alt，使用 figure 标签", complexity: "medium", designTokens: { gap: "0.5rem", borderRadius: "0.5rem" }, related: ["Carousel", "Lightbox", "ImageUpload"], codeExample: `<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
  {images.map(img => (
    <figure key={img.id} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
    </figure>
  ))}
</div>` },
  { name: "Lightbox", category: "data-display", description: "灯箱，放大查看图片或媒体。", platform: ["desktop", "tablet"], tags: ["图片", "放大", "查看"], variants: ["default", "withThumbnails", "withZoom"], accessibility: "使用 dialog role，Esc 关闭，焦点管理", complexity: "medium", designTokens: { backdropColor: "rgba(0,0,0,0.9)" }, related: ["Gallery", "Dialog", "Modal"], codeExample: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-4xl bg-black/95 border-0 p-0">
    <img src={currentImage} alt={alt} className="max-h-[80vh] w-full object-contain" />
    <button className="absolute left-4 top-1/2 text-white" aria-label="上一张">‹</button>
    <button className="absolute right-4 top-1/2 text-white" aria-label="下一张">›</button>
  </DialogContent>
</Dialog>` },
  { name: "Map", category: "data-display", description: "地图组件，展示地理位置和标记。", platform: ["desktop", "mobile", "tablet"], tags: ["地图", "位置", "标记"], variants: ["default", "withMarkers", "readonly"], accessibility: "提供地址文本作为地图的替代", complexity: "complex", designTokens: { borderRadius: "0.75rem", minHeight: "18rem" }, related: ["LocationPicker", "Card"], codeExample: `<div className="relative overflow-hidden rounded-xl border h-72 bg-zinc-100 flex items-center justify-center">
  <MapPin className="h-8 w-8 text-zinc-400" />
  <span className="absolute bottom-3 left-3 text-sm bg-white px-2 py-1 rounded shadow">北京市朝阳区</span>
</div>` },
  { name: "Calendar", category: "data-display", description: "日历，展示月份视图和事件标记。", platform: ["desktop", "mobile", "tablet"], tags: ["日历", "日期", "事件"], variants: ["month", "week", "year", "withEvents"], accessibility: "使用 grid role 构建日期表格", complexity: "complex", designTokens: { cellSize: "2.5rem", borderRadius: "0.375rem" }, related: ["DatePicker", "Timeline", "Scheduler"], codeExample: `<div className="rounded-xl border p-4">
  <div className="flex items-center justify-between mb-4">
    <button aria-label="上一月">‹</button>
    <h3 className="text-sm font-semibold">2026年5月</h3>
    <button aria-label="下一月">›</button>
  </div>
  <div className="grid grid-cols-7 gap-1 text-center">
    {['一','二','三','四','五','六','日'].map(d => <div key={d} className="text-xs text-zinc-400 py-1">{d}</div>)}
    {days.map((d, i) => (
      <button key={i} className="h-9 w-9 text-sm rounded hover:bg-zinc-100 aria-[current]:bg-zinc-900 aria-[current]:text-white" aria-current={d.isToday}>
        {d.day}
      </button>
    ))}
  </div>
</div>` },
  { name: "KanbanBoard", category: "data-display", description: "看板，拖拽卡片管理任务流。", platform: ["desktop", "tablet"], tags: ["看板", "拖拽", "任务"], variants: ["default", "compact", "withSubtasks"], accessibility: "使用 grid role 包裹列，每个卡片可拖拽排序", complexity: "complex", designTokens: { columnWidth: "18rem", cardRadius: "0.5rem" }, related: ["Card", "DragDrop", "Table"], codeExample: `<div className="flex gap-4 overflow-x-auto pb-4">
  {columns.map(col => (
    <div key={col.id} className="w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{col.title}</h3>
        <Badge variant="secondary">{col.items.length}</Badge>
      </div>
      <div className="space-y-2">
        {col.items.map(item => (
          <Card key={item.id} className="cursor-grab active:cursor-grabbing">
            <CardContent className="p-3 text-sm">{item.title}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  ))}
</div>` },
  { name: "GanttChart", category: "data-display", description: "甘特图，项目管理时间轴视图。", platform: ["desktop"], tags: ["甘特图", "项目管理", "时间"], variants: ["default", "withDependencies"], accessibility: "使用 grid role，时间信息提供文本替代", complexity: "complex", designTokens: { rowHeight: "2.5rem", headerHeight: "3rem" }, related: ["Timeline", "Calendar", "Table"], codeExample: `<div className="overflow-auto">
  <div className="flex">
    <div className="w-48 flex-shrink-0 border-r">
      {tasks.map(task => <div key={task.id} className="h-10 flex items-center px-4 border-b text-sm">{task.name}</div>)}
    </div>
    <div className="flex-1 relative">
      {tasks.map((task, i) => (
        <div key={task.id} className="h-10 border-b relative">
          <div className="absolute top-2 h-6 rounded bg-blue-500" style={{left: task.startPercent+'%', width: task.durationPercent+'%'}} />
        </div>
      ))}
    </div>
  </div>
</div>` },
  { name: "JSONViewer", category: "data-display", description: "JSON 查看器，可折叠的结构化数据展示。", platform: ["desktop"], tags: ["JSON", "数据", "结构"], variants: ["default", "editable", "withSearch"], accessibility: "使用 tree role 展示结构", complexity: "medium", designTokens: { indent: "1.25rem", fontSize: "0.8125rem", fontFamily: "monospace" }, related: ["Code", "TreeView", "DataGrid"], codeExample: `<pre className="text-sm font-mono bg-zinc-50 rounded-lg p-4 overflow-auto max-h-96">
  "name": "Button",
  "category": "basic",
  "variants": ["default", "outline"]
</pre>` },
  { name: "DiffViewer", category: "data-display", description: "差异对比器，高亮展示两个版本间的差异。", platform: ["desktop"], tags: ["对比", "差异", "代码"], variants: ["split", "unified"], accessibility: "新增/删除行提供视觉+文本标识", complexity: "complex", designTokens: { addedColor: "#dcfce7", removedColor: "#fee2e2" }, related: ["JSONViewer", "CodeEditor", "Code"], codeExample: `<div className="grid grid-cols-2 border rounded-lg overflow-hidden text-sm font-mono">
  <div className="p-3 bg-red-50">
    <div className="text-red-700">- const name = "old";</div>
  </div>
  <div className="p-3 bg-green-50">
    <div className="text-green-700">+ const name = "new";</div>
  </div>
</div>` },
];
