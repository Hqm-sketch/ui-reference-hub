import { ComponentMeta } from "@/lib/registry";

export const animationComponents: ComponentMeta[] = [
  { name: "FadeIn", category: "animation", description: "淡入动画，元素透明度从0到1过渡。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "淡入", "过渡"], variants: ["default", "slow", "fast"], accessibility: "配合 prefers-reduced-motion 禁用动画", complexity: "simple", designTokens: { duration: "0.3s", easing: "ease-out" }, related: ["Transition", "AnimatePresence", "ScrollReveal"], codeExample: `<div className="animate-in fade-in duration-500">
  淡入的内容
</div>` },
  { name: "SlideIn", category: "animation", description: "滑入动画，元素从指定方向滑入。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "滑入", "方向"], variants: ["fromTop", "fromBottom", "fromLeft", "fromRight"], accessibility: "配合 reduced-motion 媒体查询", complexity: "simple", designTokens: { duration: "0.3s", distance: "0.5rem" }, related: ["FadeIn", "Transition", "Drawer"], codeExample: `<div className="animate-in slide-in-from-bottom-4 duration-300">
  从下方滑入
</div>` },
  { name: "ZoomIn", category: "animation", description: "缩放动画，元素从小到大出现。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "缩放", "弹出"], variants: ["default", "bounce", "spring"], accessibility: "配合 reduced-motion 禁用", complexity: "simple", designTokens: { duration: "0.2s", scale: "0.95→1" }, related: ["FadeIn", "Modal", "Transition"], codeExample: `<div className="animate-in zoom-in-95 duration-200">
  缩放出现
</div>` },
  { name: "HoverEffect", category: "animation", description: "悬停效果，鼠标悬停时的视觉变化。", platform: ["desktop"], tags: ["悬停", "效果", "交互"], variants: ["lift", "glow", "scale", "border"], accessibility: "悬停效果不能传达唯一信息", complexity: "simple", designTokens: { duration: "0.2s", scale: "1.02" }, related: ["Card", "Button", "Transition"], codeExample: `<div className="rounded-xl border p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
  悬停查看效果
</div>` },
  { name: "ScrollReveal", category: "animation", description: "滚动显示，元素进入视口时触发动画。", platform: ["desktop", "mobile", "tablet"], tags: ["滚动", "显示", "视口"], variants: ["fade", "slide", "zoom"], accessibility: "配合 reduced-motion，动画仅触发一次", complexity: "medium", designTokens: { threshold: "0.2", duration: "0.6s" }, related: ["FadeIn", "SlideIn", "IntersectionObserver"], codeExample: `<div className="opacity-0 translate-y-4 transition-all duration-600 [&.visible]:opacity-100 [&.visible]:translate-y-0">
  滚动到此处显示
</div>` },
  { name: "Stagger", category: "animation", description: "交错动画，子元素依次出现。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "交错", "列表"], variants: ["list", "grid", "cascade"], accessibility: "动画延迟不能影响可访问性", complexity: "medium", designTokens: { staggerDelay: "0.05s", itemDuration: "0.3s" }, related: ["ListAnimation", "ScrollReveal", "FadeIn"], codeExample: `<div className="space-y-2">
  {items.map((item, i) => (
    <div key={i} className="animate-in fade-in slide-in-from-bottom-2" style={{animationDelay: "150ms", animationFillMode: "backwards"}}>
      {item}
    </div>
  ))}
</div>` },
  { name: "PageTransition", category: "animation", description: "页面切换动画，页面间的过渡效果。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "页面", "切换"], variants: ["fade", "slide", "none"], accessibility: "保持焦点管理，prefers-reduced-motion 禁用", complexity: "complex", designTokens: { duration: "0.3s" }, related: ["Transition", "FadeIn", "RouteTransition"], codeExample: `<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
  {pageContent}
</div>` },
  { name: "Pulse", category: "animation", description: "脉冲动画，周期性的缩放闪烁效果。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "脉冲", "闪烁"], variants: ["default", "dot", "ring"], accessibility: "不能闪烁超过3次/秒，避免引发癫痫", complexity: "simple", designTokens: { duration: "2s", iteration: "infinite" }, related: ["Spinner", "StatusDot", "LoadingState"], codeExample: `<div className="relative">
  <span className="absolute h-3 w-3 rounded-full bg-red-500" />
  <span className="absolute h-3 w-3 rounded-full bg-red-500 animate-ping" />
</div>` },
  { name: "Shimmer", category: "animation", description: "微光效果，扫描光条常用于加载占位。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "微光", "加载"], variants: ["default", "card", "text"], accessibility: "纯装饰动画", complexity: "simple", designTokens: { duration: "1.5s", gradient: "transparent→white→transparent" }, related: ["Skeleton", "LoadingState", "Pulse"], codeExample: `<div className="h-4 rounded bg-zinc-200 relative overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
</div>` },
  { name: "NumberAnimation", category: "animation", description: "数字动画，数字递增递减的计数效果。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "数字", "计数"], variants: ["countUp", "countDown", "ticker"], accessibility: "使用 aria-live 区域或 aria-valuenow 通知变化", complexity: "medium", designTokens: { duration: "1.5s", easing: "ease-out" }, related: ["StatCard", "Countdown", "Progress"], codeExample: `<span className="text-2xl font-bold tabular-nums">
  {count.toLocaleString()}
</span>` },
  { name: "Ripple", category: "animation", description: "波纹效果，点击时从触点扩散的水波。", platform: ["desktop", "mobile"], tags: ["动画", "波纹", "点击"], variants: ["default", "center"], accessibility: "纯装饰效果", complexity: "medium", designTokens: { duration: "0.6s", maxSize: "300px" }, related: ["Button", "ClickEffect", "InteractionFeedback"], codeExample: `<button className="relative overflow-hidden rounded-lg px-4 py-2 bg-zinc-900 text-white">
  点击波纹
  <span className="absolute rounded-full bg-white/30 animate-ripple" style={{width: rippleSize, height: rippleSize}} />
</button>` },
  { name: "ProgressAnimation", category: "animation", description: "进度动画，进度条和环形进度的动态变化。", platform: ["desktop", "mobile", "tablet"], tags: ["动画", "进度", "动态"], variants: ["linear", "circular", "indeterminate"], accessibility: "使用 progressbar role 实时更新", complexity: "medium", designTokens: { duration: "0.5s", easing: "ease-out" }, related: ["Progress", "CircularProgress", "LoadingState"], codeExample: `<div className="space-y-2">
  <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
    <div className="h-full bg-zinc-900 rounded-full transition-all duration-500 ease-out" style={{width: "75%"}} />
  </div>
  <span className="text-xs text-zinc-500">{percent}%</span>
</div>` },
  { name: "Confetti", category: "animation", description: "彩带庆祝动画，用于成功/完成场景。", platform: ["desktop", "mobile"], tags: ["动画", "庆祝", "彩带"], variants: ["default", "burst", "continuous"], accessibility: "纯装饰动画，关键信息不能仅靠动画传达", complexity: "complex", designTokens: { duration: "3s", particleCount: "50" }, related: ["Result", "Celebration", "Toast"], codeExample: `<div className="relative">
  {showConfetti && (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-full animate-bounce" style={{left: p.x, background: p.color, animationDelay: p.delay}} />
      ))}
    </div>
  )}
</div>` },
  { name: "SkeletonLoader", category: "animation", description: "骨架加载动画，内容加载时的占位动画。", platform: ["desktop", "mobile", "tablet"], tags: ["加载", "骨架", "占位"], variants: ["text", "card", "avatar", "table"], accessibility: "使用 aria-busy='true' 标记加载区域", complexity: "simple", designTokens: { pulseDuration: "2s" }, related: ["Skeleton", "Shimmer", "LoadingState"], codeExample: `<div className="space-y-4 animate-pulse">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-full bg-zinc-200" />
    <div className="space-y-2 flex-1">
      <div className="h-3 w-1/3 rounded bg-zinc-200" />
      <div className="h-3 w-1/2 rounded bg-zinc-200" />
    </div>
  </div>
</div>` },
  { name: "DragAnimation", category: "animation", description: "拖拽动画，拖拽时的视觉反馈。", platform: ["desktop", "mobile"], tags: ["动画", "拖拽", "反馈"], variants: ["lift", "ghost", "reorder"], accessibility: "拖拽操作提供键盘替代方案", complexity: "complex", designTokens: { liftScale: "1.05", shadow: "0 10px 30px rgba(0,0,0,0.15)" }, related: ["DragDrop", "SortableList", "KanbanBoard"], codeExample: `<div className="rounded-lg border p-4 cursor-grab active:cursor-grabbing active:shadow-xl active:scale-105 transition-all">
  拖拽我
</div>` },
  { name: "TypingEffect", category: "animation", description: "打字效果，逐字显示的文本动画。", platform: ["desktop", "mobile"], tags: ["动画", "打字", "文本"], variants: ["default", "withCursor", "loop"], accessibility: "完整文本已经在 DOM 中，动画不影响可访问性", complexity: "medium", designTokens: { speed: "50ms/char", cursorBlink: "0.5s" }, related: ["TextReveal", "NumberAnimation"], codeExample: `<div className="font-mono text-lg">
  <span>{displayedText}</span>
  <span className="animate-blink border-r-2 border-zinc-900 ml-0.5">&nbsp;</span>
</div>` },
  { name: "AnimatedIcon", category: "animation", description: "动画图标，带交互反馈的图标组件。", platform: ["desktop", "mobile"], tags: ["动画", "图标", "交互"], variants: ["hover", "click", "morph"], accessibility: "动画图标的语义通过 aria-label 传达", complexity: "simple", designTokens: { duration: "0.3s" }, related: ["Icon", "IconButton", "LikeButton"], codeExample: `<button className="group relative" aria-label="点赞">
  <Heart className="h-6 w-6 transition-all group-hover:scale-110 group-active:scale-90" />
</button>` },
];
