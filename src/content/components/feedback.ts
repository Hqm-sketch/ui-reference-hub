import { ComponentMeta } from "@/lib/registry";

export const feedbackComponents: ComponentMeta[] = [
  { name: "Alert", category: "feedback", description: "警告提示，展示重要信息、警告或错误。", platform: ["desktop", "mobile", "tablet"], tags: ["提示", "警告", "反馈"], variants: ["info", "success", "warning", "error", "withAction"], accessibility: "使用 alert/status role，role='alert' 会立即通知屏幕阅读器", complexity: "simple", designTokens: { borderRadius: "0.5rem", padding: "1rem" }, related: ["Toast", "Banner", "Notification"], codeExample: `<div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4" role="alert">
  <div className="flex items-center gap-2">
    <Info className="h-4 w-4 text-blue-500" />
    <p className="text-sm font-medium text-blue-900">提示信息</p>
  </div>
  <p className="mt-1 text-sm text-blue-700">这是一条重要的提示内容。</p>
</div>` },
  { name: "Toast", category: "feedback", description: "消息提示，短暂出现于屏幕角落的轻量通知。", platform: ["desktop", "mobile"], tags: ["通知", "提示", "消息"], variants: ["success", "error", "info", "loading", "withAction"], accessibility: "使用 status/alert role，配合 aria-live 区域", complexity: "medium", designTokens: { borderRadius: "0.5rem", padding: "0.75rem 1rem" }, related: ["Alert", "Notification", "Sonner"], codeExample: `<div className="fixed bottom-4 right-4 z-50 rounded-lg border bg-white p-4 shadow-lg animate-in slide-in-from-right">
  <div className="flex items-center gap-2">
    <CheckCircle className="h-4 w-4 text-green-500" />
    <p className="text-sm font-medium">操作成功</p>
  </div>
  <p className="mt-1 text-sm text-zinc-500">更改已保存。</p>
</div>` },
  { name: "Notification", category: "feedback", description: "通知提醒，带标题和内容的系统通知。", platform: ["desktop", "mobile"], tags: ["通知", "提醒", "系统"], variants: ["default", "withAvatar", "withActions"], accessibility: "使用 aria-live='polite' 区域包裹", complexity: "medium", designTokens: { borderRadius: "0.75rem", padding: "1rem" }, related: ["Toast", "Alert", "NotificationCenter"], codeExample: `<div className="w-80 rounded-xl border bg-white p-4 shadow-lg">
  <div className="flex items-start gap-3">
    <Avatar />
    <div className="flex-1">
      <p className="text-sm font-semibold">新消息</p>
      <p className="text-sm text-zinc-500 mt-0.5">张三 评论了你的帖子</p>
      <p className="text-xs text-zinc-400 mt-2">2分钟前</p>
    </div>
  </div>
</div>` },
  { name: "NotificationCenter", category: "feedback", description: "通知中心，汇聚所有通知的弹出面板。", platform: ["desktop"], tags: ["通知", "中心", "消息"], variants: ["default", "withTabs", "withActions"], accessibility: "使用 dialog/region role，每个通知可聚焦", complexity: "medium", designTokens: { borderRadius: "0.75rem", width: "24rem", maxHeight: "28rem" }, related: ["Notification", "Popover", "DropdownMenu"], codeExample: `<div className="w-96 rounded-xl border bg-white shadow-xl">
  <div className="flex items-center justify-between border-b px-4 py-3">
    <h3 className="text-sm font-semibold">通知</h3>
    <Badge variant="secondary">3 条未读</Badge>
  </div>
  <div className="max-h-80 overflow-auto">
    {notifications.map(n => (
      <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-zinc-50 border-b last:border-0">
        <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
        <div><p className="text-sm">{n.title}</p><p className="text-xs text-zinc-400 mt-0.5">{n.time}</p></div>
      </div>
    ))}
  </div>
</div>` },
  { name: "Dialog", category: "feedback", description: "对话框，需要用户关注的模态窗口。", platform: ["desktop", "mobile", "tablet"], tags: ["弹窗", "模态", "确认"], variants: ["default", "alert", "confirm", "fullScreen"], accessibility: "使用 dialog role，aria-modal='true'，打开时焦点移入", complexity: "medium", designTokens: { borderRadius: "0.75rem", padding: "1.5rem", maxWidth: "32rem" }, related: ["Modal", "Drawer", "Alert"], codeExample: `<Dialog>
  <DialogTrigger asChild><Button>打开对话框</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>确认操作</DialogTitle>
      <DialogDescription>此操作不可撤销，确定要继续吗？</DialogDescription>
    </DialogHeader>
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline">取消</Button>
      <Button variant="destructive">确认删除</Button>
    </div>
  </DialogContent>
</Dialog>` },
  { name: "Modal", category: "feedback", description: "模态框，占据全屏或大面积的弹出层。", platform: ["desktop", "mobile", "tablet"], tags: ["弹窗", "模态", "覆盖"], variants: ["default", "fullScreen", "slideOver"], accessibility: "打开时锁定焦点在模态框内，Esc 关闭", complexity: "medium", designTokens: { borderRadius: "0.75rem", backdropColor: "rgba(0,0,0,0.5)" }, related: ["Dialog", "Drawer", "Lightbox"], codeExample: `<div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  <div className="relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" role="dialog" aria-modal="true">
    <h2 className="text-lg font-semibold">模态标题</h2>
    {content}
  </div>
</div>` },
  { name: "ConfirmDialog", category: "feedback", description: "确认对话框，专用删除/操作确认弹窗。", platform: ["desktop", "mobile"], tags: ["确认", "删除", "警告"], variants: ["delete", "archive", "leavePage"], accessibility: "使用 alertdialog role，焦点默认在取消按钮", complexity: "simple", designTokens: { borderRadius: "0.75rem", maxWidth: "25rem" }, related: ["Dialog", "Popconfirm", "Alert"], codeExample: `<div className="rounded-xl border bg-white p-6 shadow-xl" role="alertdialog" aria-modal="true">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
      <AlertTriangle className="h-5 w-5 text-red-600" />
    </div>
    <div>
      <h3 className="text-sm font-semibold">确认删除</h3>
      <p className="text-sm text-zinc-500">此操作无法撤销</p>
    </div>
  </div>
  <div className="flex justify-end gap-2 mt-6">
    <Button variant="outline" size="sm">取消</Button>
    <Button variant="destructive" size="sm">删除</Button>
  </div>
</div>` },
  { name: "Popconfirm", category: "feedback", description: "气泡确认框，点击后弹出的轻量确认。", platform: ["desktop"], tags: ["确认", "气泡", "轻量"], variants: ["default", "withIcon"], accessibility: "使用 alertdialog role，焦点管理", complexity: "medium", designTokens: { borderRadius: "0.5rem", padding: "0.75rem" }, related: ["ConfirmDialog", "Tooltip", "Popover"], codeExample: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="sm">删除</Button>
  </PopoverTrigger>
  <PopoverContent className="w-60 p-3">
    <p className="text-sm mb-3">确定要删除吗？</p>
    <div className="flex justify-end gap-2">
      <Button size="sm" variant="outline">取消</Button>
      <Button size="sm" variant="destructive">确认</Button>
    </div>
  </PopoverContent>
</Popover>` },
  { name: "Popover", category: "feedback", description: "气泡卡片，点击弹出额外信息面板。", platform: ["desktop"], tags: ["气泡", "弹出", "信息"], variants: ["default", "withForm", "withList"], accessibility: "使用 dialog role，焦点移入面板", complexity: "medium", designTokens: { borderRadius: "0.5rem", padding: "1rem" }, related: ["Tooltip", "DropdownMenu", "Popconfirm"], codeExample: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">设置</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="text-sm font-medium">显示设置</h4>
      <div className="flex items-center justify-between">
        <label className="text-sm">紧凑模式</label>
        <Switch />
      </div>
    </div>
  </PopoverContent>
</Popover>` },
  { name: "Sheet", category: "feedback", description: "抽屉面板，从屏幕边缘滑出的内容板。", platform: ["desktop", "mobile"], tags: ["面板", "滑出", "抽屉"], variants: ["left", "right", "bottom"], accessibility: "使用 dialog role，打开时焦点移入", complexity: "medium", designTokens: { width: "24rem", borderRadius: "0" }, related: ["Drawer", "Dialog", "Modal"], codeExample: `<div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 animate-in slide-in-from-right" role="dialog">
  <div className="flex items-center justify-between p-4 border-b">
    <h2 className="text-sm font-semibold">面板标题</h2>
    <Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
  </div>
  <div className="p-4">{content}</div>
</div>` },
  { name: "Banner", category: "feedback", description: "横幅通知，页面顶部的全局提示条。", platform: ["desktop", "mobile", "tablet"], tags: ["横幅", "通知", "全局"], variants: ["default", "dismissible", "sticky"], accessibility: "使用 alert/status role，关闭按钮有 label", complexity: "simple", designTokens: { padding: "0.75rem 1rem", minHeight: "2.75rem" }, related: ["Alert", "Toast", "CookieBanner"], codeExample: `<div className="bg-zinc-900 text-white text-center py-3 px-6 text-sm flex items-center justify-center gap-4">
  <p>🎉 新功能上线！查看最新组件更新。</p>
  <button className="underline hover:text-zinc-300">了解更多</button>
  <button className="ml-auto" aria-label="关闭"><X className="h-4 w-4" /></button>
</div>` },
  { name: "CookieBanner", category: "feedback", description: "Cookie 同意横幅，数据隐私合规。", platform: ["desktop", "mobile"], tags: ["隐私", "GDPR", "横幅"], variants: ["default", "centered", "detailed"], accessibility: "按钮可聚焦，链接可导航", complexity: "simple", designTokens: { borderRadius: "0.75rem", padding: "1rem" }, related: ["Banner", "ConsentDialog"], codeExample: `<div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 rounded-xl border bg-white p-4 shadow-xl z-50">
  <p className="text-sm">本网站使用 Cookie 改善体验。继续浏览即表示同意。</p>
  <div className="flex gap-2 mt-3">
    <Button size="sm">接受全部</Button>
    <Button size="sm" variant="outline">自定义</Button>
  </div>
</div>` },
  { name: "LoadingOverlay", category: "feedback", description: "加载覆盖层，阻止交互的全屏 Loading。", platform: ["desktop", "mobile", "tablet"], tags: ["加载", "覆盖", "等待"], variants: ["default", "withText", "transparent"], accessibility: "使用 aria-busy='true' 和 aria-label", complexity: "simple", designTokens: { backdropColor: "rgba(255,255,255,0.8)" }, related: ["Spinner", "LoadingState", "Skeleton"], codeExample: `<div className="relative">
  {content}
  {isLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-zinc-500">加载中...</p>
      </div>
    </div>
  )}
</div>` },
  { name: "ScoreBoard", category: "feedback", description: "评分板，展示用户评分和总计。", platform: ["desktop", "mobile"], tags: ["评分", "评价", "统计"], variants: ["default", "detailed", "compact"], accessibility: "评分用文本明确表示，星级只是视觉增强", complexity: "simple", designTokens: { starSize: "1.25rem" }, related: ["StarRating", "Review", "StatCard"], codeExample: `<div className="flex items-center gap-6 p-6 rounded-xl border">
  <div className="text-center">
    <span className="text-4xl font-bold">4.8</span>
    <div className="flex mt-1">⭐⭐⭐⭐⭐</div>
    <p className="text-xs text-zinc-400 mt-1">1,234 条评价</p>
  </div>
  <div className="flex-1 space-y-1">
    {[5,4,3,2,1].map(n => (
      <div key={n} className="flex items-center gap-2 text-sm">
        <span className="w-3">{n}</span><span className="text-yellow-500">★</span>
        <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full" style={{width: "45%"}} />
        </div>
      </div>
    ))}
  </div>
</div>` },
  { name: "Result", category: "feedback", description: "结果页，操作完成后的结果展示（成功/失败）。", platform: ["desktop", "mobile", "tablet"], tags: ["结果", "状态", "反馈"], variants: ["success", "error", "warning", "info"], accessibility: "结果标题使用 heading，补充操作用 button", complexity: "simple", designTokens: { padding: "3rem" }, related: ["EmptyState", "ErrorState", "Alert"], codeExample: `<div className="flex flex-col items-center justify-center py-20 text-center">
  <CheckCircle className="h-16 w-16 text-green-500" />
  <h1 className="mt-6 text-2xl font-bold">提交成功</h1>
  <p className="mt-2 text-zinc-500">我们将在 1-2 个工作日内处理您的申请。</p>
  <div className="flex gap-3 mt-8">
    <Button>返回首页</Button>
    <Button variant="outline">查看详情</Button>
  </div>
</div>` },
];
