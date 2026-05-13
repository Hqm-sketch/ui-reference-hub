import { ComponentMeta } from "@/lib/registry";

export const basicComponents: ComponentMeta[] = [
  {
    name: "Button",
    category: "basic",
    description: "按钮用于触发操作，支持多种变体、尺寸和状态。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["按钮", "交互", "表单", "CTA"],
    variants: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    accessibility: "使用原生 button 元素，支持 Enter/Space 键盘触发，disabled 状态正确传达",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: "500" },
    related: ["IconButton", "ButtonGroup", "LoadingButton"],
    codeExample: `<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">边框按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="link">链接按钮</Button>
<Button size="lg">大按钮</Button>
<Button size="sm">小按钮</Button>`,
  },
  {
    name: "IconButton",
    category: "basic",
    description: "图标按钮，仅显示图标不显示文字，适用于工具栏和紧凑布局。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["按钮", "图标", "工具栏"],
    variants: ["default", "ghost", "outline"],
    accessibility: "必须提供 aria-label 描述按钮功能",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", width: "2.5rem", height: "2.5rem" },
    related: ["Button", "Toolbar"],
    codeExample: `<Button size="icon" aria-label="搜索">
  <Search className="h-4 w-4" />
</Button>
<Button size="icon" variant="ghost" aria-label="设置">
  <Settings className="h-4 w-4" />
</Button>`,
  },
  {
    name: "ButtonGroup",
    category: "basic",
    description: "按钮组用于组合相关的操作按钮，形成视觉关联。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["按钮", "分组", "工具栏"],
    variants: ["default", "outline"],
    accessibility: "使用 role='group' 标记，aria-label 描述组功能",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", gap: "0" },
    related: ["Button", "SegmentedControl"],
    codeExample: `<div className="inline-flex rounded-lg shadow-sm" role="group">
  <button className="rounded-l-lg border px-4 py-2">左</button>
  <button className="border px-4 py-2">中</button>
  <button className="rounded-r-lg border px-4 py-2">右</button>
</div>`,
  },
  {
    name: "LoadingButton",
    category: "basic",
    description: "加载按钮在按钮内部显示加载状态，防止重复提交。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["按钮", "加载", "状态", "异步"],
    variants: ["default", "secondary", "destructive"],
    accessibility: "加载时设置 aria-busy='true' 和 disabled 属性",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 1rem" },
    related: ["Button", "Spinner"],
    codeExample: `<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  加载中...
</Button>`,
  },
  {
    name: "Input",
    category: "basic",
    description: "输入框是最基础的表单元素，用于接收用户文本输入。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["输入", "表单", "文本"],
    variants: ["default", "disabled", "error", "withIcon"],
    accessibility: "使用 label 关联，通过 aria-describedby 关联错误提示",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem", fontSize: "0.875rem", height: "2.5rem" },
    related: ["Textarea", "SearchInput", "PasswordInput"],
    codeExample: `<Input placeholder="请输入内容" />
<Input type="email" placeholder="请输入邮箱" />
<Input disabled placeholder="禁用状态" />
<Input aria-invalid placeholder="错误状态" className="border-red-500" />`,
  },
  {
    name: "Textarea",
    category: "basic",
    description: "多行文本输入框，适用于长文本如评论、描述、备注等。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["输入", "文本", "多行", "表单"],
    variants: ["default", "disabled", "error"],
    accessibility: "关联 label，支持 resize 控制",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem", minHeight: "5rem" },
    related: ["Input", "RichTextEditor"],
    codeExample: `<textarea
  className="flex min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
  placeholder="请输入详细描述..."
/>`,
  },
  {
    name: "SearchInput",
    category: "basic",
    description: "搜索输入框，带有搜索图标和清除功能。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["输入", "搜索", "筛选"],
    variants: ["default", "withShortcut"],
    accessibility: "支持 Escape 清除，显示快捷键提示",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem" },
    related: ["Input", "CommandPalette"],
    codeExample: `<div className="relative">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
  <Input className="pl-8" placeholder="搜索..." />
  <kbd className="absolute right-2.5 top-2.5 text-xs text-zinc-400">⌘K</kbd>
</div>`,
  },
  {
    name: "PasswordInput",
    category: "basic",
    description: "密码输入框，支持显示/隐藏密码切换。",
    platform: ["desktop", "mobile"],
    tags: ["输入", "密码", "安全", "表单"],
    variants: ["default", "withStrength"],
    accessibility: "密码可见性切换按钮设置 aria-label",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem" },
    related: ["Input", "FormValidation"],
    codeExample: `<div className="relative">
  <Input type="password" placeholder="请输入密码" />
  <button className="absolute right-2.5 top-2.5" aria-label="显示密码">
    <Eye className="h-4 w-4" />
  </button>
</div>`,
  },
  {
    name: "Badge",
    category: "basic",
    description: "徽章用于标记状态、计数或标签。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["标签", "状态", "标记"],
    variants: ["default", "secondary", "success", "warning", "destructive", "outline"],
    accessibility: "纯展示元素，关键信息需配合 sr-only",
    complexity: "simple",
    designTokens: { borderRadius: "0.375rem", padding: "0.125rem 0.625rem", fontSize: "0.75rem" },
    related: ["Tag", "StatusDot", "Label"],
    codeExample: `<Badge>默认</Badge>
<Badge variant="secondary">次要</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="destructive">危险</Badge>`,
  },
  {
    name: "Label",
    category: "basic",
    description: "标签文本，用于标记分类、属性或元数据。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["标签", "分类", "元数据"],
    variants: ["default", "removable", "withIcon"],
    accessibility: "纯展示，可移除标签使用 button 元素",
    complexity: "simple",
    designTokens: { borderRadius: "0.375rem", padding: "0.125rem 0.5rem", fontSize: "0.75rem" },
    related: ["Badge", "Chip"],
    codeExample: `<div className="flex gap-2">
  <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs">React</span>
  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">TypeScript</span>
  <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">设计</span>
</div>`,
  },
  {
    name: "Chip",
    category: "basic",
    description: "芯片组件，用于显示选中项目，支持删除操作。",
    platform: ["desktop", "mobile"],
    tags: ["标签", "选择", "筛选"],
    variants: ["default", "active", "disabled"],
    accessibility: "删除按钮使用 aria-label 标识",
    complexity: "simple",
    designTokens: { borderRadius: "9999px", padding: "0.125rem 0.75rem" },
    related: ["Badge", "MultiSelect", "TagInput"],
    codeExample: `<div className="flex flex-wrap gap-2">
  <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
    React
    <button aria-label="移除 React" className="ml-1 rounded-full hover:bg-zinc-200">&times;</button>
  </span>
</div>`,
  },
  {
    name: "Avatar",
    category: "basic",
    description: "头像组件，支持图片、文字缩写和在线状态指示。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["头像", "用户", "图片"],
    variants: ["image", "fallback", "withStatus"],
    accessibility: "纯装饰图像使用 img alt=''，有信息的使用有意义 alt",
    complexity: "simple",
    designTokens: { borderRadius: "9999px", width: "2.5rem", height: "2.5rem" },
    related: ["AvatarGroup", "UserCard", "ProfileMenu"],
    codeExample: `<div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-full bg-zinc-300">
    <img src="/avatar.jpg" alt="用户头像" className="rounded-full" />
  </div>
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium">
    ZS
  </div>
  <div className="relative h-10 w-10 rounded-full bg-zinc-200">
    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
  </div>
</div>`,
  },
  {
    name: "AvatarGroup",
    category: "basic",
    description: "头像组，堆叠显示多个用户头像，多余显示+N。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["头像", "群组", "用户"],
    variants: ["overlap", "compact"],
    accessibility: "使用 aria-label 描述组和剩余人数",
    complexity: "simple",
    designTokens: { overlap: "-0.5rem", size: "2.5rem" },
    related: ["Avatar", "UserList"],
    codeExample: `<div className="flex -space-x-2">
  <div className="h-8 w-8 rounded-full bg-blue-200 ring-2 ring-white" />
  <div className="h-8 w-8 rounded-full bg-green-200 ring-2 ring-white" />
  <div className="h-8 w-8 rounded-full bg-red-200 ring-2 ring-white" />
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-white text-xs">
    +5
  </div>
</div>`,
  },
  {
    name: "Icon",
    category: "basic",
    description: "图标组件系统，支持多种尺寸和颜色。基于 Lucide Icons。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["图标", "视觉", "符号"],
    variants: ["sm", "md", "lg", "xl"],
    accessibility: "装饰性图标设置 aria-hidden='true'，功能性图标提供 aria-label",
    complexity: "simple",
    designTokens: { sizes: "1rem / 1.25rem / 1.5rem / 2rem" },
    related: ["IconButton", "NavIcon"],
    codeExample: `<Search className="h-4 w-4" />
<Heart className="h-6 w-6 text-red-500" />
<Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />`,
  },
  {
    name: "Link",
    category: "basic",
    description: "链接组件，支持内部路由跳转和外部链接。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["链接", "导航", "跳转"],
    variants: ["default", "underline", "subtle", "withIcon"],
    accessibility: "外部链接使用 rel='noopener noreferrer'，新窗口使用 target='_blank'",
    complexity: "simple",
    designTokens: { color: "#2563eb", textDecoration: "underline" },
    related: ["Breadcrumb", "NavLink", "Button"],
    codeExample: `<a href="/page" className="text-blue-600 hover:underline">内部链接</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
  外部链接 <ExternalLink className="h-3 w-3" />
</a>`,
  },
  {
    name: "Typography",
    category: "basic",
    description: "排版组件，定义标题、段落、引用等文本层级。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["排版", "文字", "层级"],
    variants: ["h1", "h2", "h3", "h4", "p", "lead", "muted", "small", "code", "blockquote"],
    accessibility: "使用语义化 HTML 标签（h1-h6，p，blockquote）",
    complexity: "simple",
    designTokens: { fontFamily: "'Geist', sans-serif", scale: "1.25" },
    related: ["RichTextEditor", "MarkdownRenderer"],
    codeExample: `<h1 className="text-4xl font-bold">一级标题</h1>
<h2 className="text-2xl font-semibold">二级标题</h2>
<p className="text-base leading-7">正文段落，良好的行高提升可读性。</p>
<p className="text-sm text-zinc-500">辅助说明文字</p>`,
  },
  {
    name: "Spinner",
    category: "basic",
    description: "加载旋转器，表示加载或处理中的状态。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["加载", "状态", "动画"],
    variants: ["sm", "md", "lg", "withText"],
    accessibility: "使用 role='status' 和 aria-label='加载中'",
    complexity: "simple",
    designTokens: { sizes: "1rem / 1.5rem / 2.5rem" },
    related: ["Skeleton", "LoadingButton", "Progress"],
    codeExample: `<div className="flex items-center gap-2">
  <Loader2 className="h-4 w-4 animate-spin" />
  <span className="text-sm text-zinc-500">加载中...</span>
</div>`,
  },
  {
    name: "Skeleton",
    category: "basic",
    description: "骨架屏，在内容加载时展示占位，减少用户感知等待。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["加载", "占位", "骨架屏"],
    variants: ["text", "circular", "rectangular", "card"],
    accessibility: "使用 aria-busy='true' 和 aria-label 标记加载区域",
    complexity: "simple",
    designTokens: { borderRadius: "0.5rem", animation: "pulse 2s infinite" },
    related: ["Spinner", "LoadingState", "EmptyState"],
    codeExample: `<div className="space-y-3">
  <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
  <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200" />
  <div className="h-20 w-full animate-pulse rounded-lg bg-zinc-200" />
</div>`,
  },
  {
    name: "Divider",
    category: "basic",
    description: "分割线，用于分隔内容区域。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["布局", "分隔", "视觉"],
    variants: ["horizontal", "vertical", "withLabel"],
    accessibility: "使用 hr 元素，role='separator'",
    complexity: "simple",
    designTokens: { width: "1px", color: "#e5e5e5" },
    related: ["Spacer", "Section"],
    codeExample: `<Separator />
<div className="flex items-center gap-4">
  <Separator className="flex-1" />
  <span className="text-sm text-zinc-400">或</span>
  <Separator className="flex-1" />
</div>`,
  },
  {
    name: "Tooltip",
    category: "basic",
    description: "工具提示，鼠标悬停时显示补充信息。",
    platform: ["desktop"],
    tags: ["提示", "悬停", "辅助"],
    variants: ["top", "bottom", "left", "right"],
    accessibility: "使用 aria-describedby 关联触发元素和提示内容",
    complexity: "simple",
    designTokens: { borderRadius: "0.375rem", padding: "0.25rem 0.75rem", fontSize: "0.75rem" },
    related: ["Popover", "HelpIcon", "InfoTip"],
    codeExample: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>这是一个提示信息</p>
  </TooltipContent>
</Tooltip>`,
  },
  {
    name: "StatusDot",
    category: "basic",
    description: "状态圆点，用颜色表示不同状态（在线、离线、忙碌等）。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["状态", "指示器", "在线"],
    variants: ["online", "offline", "busy", "away"],
    accessibility: "配合 sr-only 文本描述状态",
    complexity: "simple",
    designTokens: { width: "0.5rem", height: "0.5rem", borderRadius: "9999px" },
    related: ["Avatar", "Badge", "StatusIndicator"],
    codeExample: `<div className="flex items-center gap-3">
  <span className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full bg-green-500" />
    <span className="text-xs">在线</span>
  </span>
  <span className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full bg-zinc-400" />
    <span className="text-xs">离线</span>
  </span>
</div>`,
  },
  {
    name: "Kbd",
    category: "basic",
    description: "键盘快捷键显示，用于展示键盘组合。",
    platform: ["desktop"],
    tags: ["键盘", "快捷键", "提示"],
    variants: ["single", "combo"],
    accessibility: "使用 kbd 语义标签",
    complexity: "simple",
    designTokens: { borderRadius: "0.25rem", padding: "0.125rem 0.375rem", fontSize: "0.75rem" },
    related: ["CommandPalette", "Tooltip"],
    codeExample: `<div className="flex items-center gap-1">
  <kbd className="rounded border px-1.5 py-0.5 text-xs font-mono">⌘</kbd>
  <span className="text-xs">+</span>
  <kbd className="rounded border px-1.5 py-0.5 text-xs font-mono">K</kbd>
</div>`,
  },
  {
    name: "Code",
    category: "basic",
    description: "代码块组件，支持语法高亮和行号。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["代码", "展示", "语法"],
    variants: ["inline", "block", "withLineNumbers"],
    accessibility: "使用 code 和 pre 语义标签",
    complexity: "simple",
    designTokens: { fontFamily: "monospace", fontSize: "0.8125rem", borderRadius: "0.5rem" },
    related: ["CodeBlock", "MarkdownRenderer"],
    codeExample: `<pre><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>`,
  },
  {
    name: "Toggle",
    category: "basic",
    description: "开关切换，用于二元状态切换。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["开关", "切换", "状态"],
    variants: ["default", "disabled", "withLabel"],
    accessibility: "使用 switch role，aria-checked 表示状态",
    complexity: "simple",
    designTokens: { width: "2.75rem", height: "1.5rem", borderRadius: "9999px" },
    related: ["Checkbox", "RadioGroup", "SegmentedControl"],
    codeExample: `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">飞行模式</Label>
</div>`,
  },
  {
    name: "Checkbox",
    category: "basic",
    description: "复选框，用于多选场景。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["选择", "表单", "多选"],
    variants: ["default", "checked", "indeterminate", "disabled"],
    accessibility: "使用原生 input[type='checkbox'] 或 checkbox role",
    complexity: "simple",
    designTokens: { width: "1rem", height: "1rem", borderRadius: "0.25rem" },
    related: ["RadioGroup", "Switch", "MultiSelect"],
    codeExample: `<div className="flex items-center space-x-2">
  <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" id="agree" />
  <label htmlFor="agree" className="text-sm">我同意服务条款</label>
</div>`,
  },
  {
    name: "RadioGroup",
    category: "basic",
    description: "单选按钮组，用于互斥选择场景。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["选择", "表单", "单选"],
    variants: ["default", "card", "disabled"],
    accessibility: "使用 radiogroup role 包裹，radio role 标记选项",
    complexity: "simple",
    designTokens: { width: "1rem", height: "1rem", borderRadius: "9999px" },
    related: ["Checkbox", "Select", "SegmentedControl"],
    codeExample: `<fieldset>
  <legend className="text-sm font-medium">选择方案</legend>
  <div className="mt-2 space-y-2">
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" name="plan" value="free" /> 免费版
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" name="plan" value="pro" /> 专业版
    </label>
  </div>
</fieldset>`,
  },
  {
    name: "Select",
    category: "basic",
    description: "下拉选择器，从选项列表中选择一个值。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["选择", "表单", "下拉"],
    variants: ["default", "disabled", "withSearch"],
    accessibility: "使用 combobox role 或原生 select + label 关联",
    complexity: "medium",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem", height: "2.5rem" },
    related: ["MultiSelect", "Combobox", "DropdownMenu"],
    codeExample: `<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="选择框架" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
    <SelectItem value="angular">Angular</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    name: "Combobox",
    category: "basic",
    description: "组合框，支持搜索过滤的下拉选择器。",
    platform: ["desktop"],
    tags: ["选择", "搜索", "输入", "表单"],
    variants: ["default", "multiple", "creatable"],
    accessibility: "使用 combobox role，aria-expanded 控制展开状态",
    complexity: "medium",
    designTokens: { borderRadius: "0.5rem", padding: "0.5rem 0.75rem" },
    related: ["Select", "SearchInput", "Autocomplete"],
    codeExample: `<div className="relative">
  <Input placeholder="搜索框架..." onChange={handleSearch} />
  <ul className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
    <li className="cursor-pointer px-3 py-2 hover:bg-zinc-100">React</li>
    <li className="cursor-pointer px-3 py-2 hover:bg-zinc-100">Vue</li>
  </ul>
</div>`,
  },
  {
    name: "ScrollArea",
    category: "basic",
    description: "自定义滚动区域，提供美观的滚动条。",
    platform: ["desktop", "mobile", "tablet"],
    tags: ["滚动", "容器", "布局"],
    variants: ["vertical", "horizontal", "both"],
    accessibility: "保持键盘滚动支持，tabindex 正确设置",
    complexity: "simple",
    designTokens: { scrollbarWidth: "0.5rem", scrollbarRadius: "9999px" },
    related: ["VirtualList", "Card", "Container"],
    codeExample: `<ScrollArea className="h-72 rounded-lg border">
  <div className="p-4">
    {items.map(item => <div key={item} className="py-2">{item}</div>)}
  </div>
</ScrollArea>`,
  },
];
