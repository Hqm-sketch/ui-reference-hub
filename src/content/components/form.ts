import { ComponentMeta } from "@/lib/registry";

export const formComponents: ComponentMeta[] = [
  { name: "Form", category: "form", description: "表单容器，管理表单状态、校验和提交。", platform: ["desktop", "mobile", "tablet"], tags: ["表单", "容器", "状态管理"], variants: ["default", "inline", "twoColumn"], accessibility: "使用 form 元素，legend 描述表单用途", complexity: "medium", designTokens: { gap: "1rem" }, related: ["FormField", "FormValidation", "Input", "Button"], codeExample: `<form className="space-y-6" onSubmit={handleSubmit}>
  <FormField label="用户名" name="username">
    <Input placeholder="请输入用户名" />
  </FormField>
  <Button type="submit">提交</Button>
</form>` },
  { name: "FormField", category: "form", description: "表单域，封装 label + input + error 的组合。", platform: ["desktop", "mobile", "tablet"], tags: ["表单", "字段", "校验"], variants: ["default", "required", "error", "horizontal"], accessibility: "label 与 input 正确关联，error 通过 aria-describedby 关联", complexity: "simple", designTokens: { gap: "0.25rem", labelFontSize: "0.875rem" }, related: ["Form", "Input", "Textarea", "Select"], codeExample: `<div className="space-y-1.5">
  <label className="text-sm font-medium">邮箱 <span className="text-red-500">*</span></label>
  <Input type="email" placeholder="请输入邮箱" />
  <p className="text-sm text-red-500">请输入有效的邮箱地址</p>
</div>` },
  { name: "FormValidation", category: "form", description: "表单校验系统，支持实时校验和提交校验。", platform: ["desktop", "mobile", "tablet"], tags: ["表单", "校验", "错误"], variants: ["onBlur", "onChange", "onSubmit"], accessibility: "错误使用 aria-describedby 和 aria-invalid，汇总错误列表", complexity: "medium", designTokens: { errorColor: "#ef4444", fontSize: "0.875rem" }, related: ["Form", "FormField", "Toast"], codeExample: `<div className="space-y-1.5">
  <Input aria-invalid placeholder="邮箱" />
  <ul className="text-sm text-red-500">
    <li>邮箱格式不正确</li>
    <li>邮箱不能为空</li>
  </ul>
</div>` },
  { name: "TextInput", category: "form", description: "标准文本输入框，包含 label、placeholder 和帮助文本。", platform: ["desktop", "mobile", "tablet"], tags: ["输入", "文本", "表单"], variants: ["default", "withHelperText", "withIcon"], accessibility: "关联 label 和 aria-describedby", complexity: "simple", designTokens: { borderRadius: "0.5rem", height: "2.5rem", padding: "0.5rem 0.75rem" }, related: ["Input", "Textarea", "NumberInput"], codeExample: `<TextInput
  label="用户名"
  placeholder="请输入用户名"
  helperText="用户名为 3-20 个字符"
/>` },
  { name: "NumberInput", category: "form", description: "数字输入框，支持步进按钮和范围限制。", platform: ["desktop", "mobile", "tablet"], tags: ["输入", "数字", "表单", "步进"], variants: ["default", "withStepper", "compact"], accessibility: "使用 type='number'，min/max 属性限制范围", complexity: "simple", designTokens: { borderRadius: "0.5rem", height: "2.5rem" }, related: ["Input", "Slider", "CurrencyInput"], codeExample: `<div className="flex items-center">
  <button className="h-10 w-10 rounded-l-lg border" aria-label="减少">-</button>
  <input type="number" className="h-10 w-20 border-y text-center" value={0} min={0} max={100} />
  <button className="h-10 w-10 rounded-r-lg border" aria-label="增加">+</button>
</div>` },
  { name: "CurrencyInput", category: "form", description: "金额输入框，自动格式化货币显示。", platform: ["desktop", "mobile"], tags: ["输入", "金额", "货币", "格式化"], variants: ["default", "withPrefix", "withDropdown"], accessibility: "金额格式化不影响实际输入值", complexity: "medium", designTokens: { borderRadius: "0.5rem", height: "2.5rem" }, related: ["NumberInput", "Input", "PriceRange"], codeExample: `<div className="relative">
  <span className="absolute left-3 top-2.5 text-zinc-400">¥</span>
  <Input className="pl-7" type="number" placeholder="0.00" />
</div>` },
  { name: "DatePicker", category: "form", description: "日期选择器，支持日期格式化和范围选择。", platform: ["desktop", "mobile", "tablet"], tags: ["日期", "选择", "日历"], variants: ["single", "range", "withTime"], accessibility: "使用 grid role 构建日历表格，方向键导航日期", complexity: "complex", designTokens: { borderRadius: "0.5rem", cellSize: "2.5rem" }, related: ["TimePicker", "DateTimePicker", "Calendar"], codeExample: `<div className="inline-flex flex-col rounded-lg border p-4">
  <div className="flex justify-between items-center mb-4">
    <button>‹</button>
    <span>2026年5月</span>
    <button>›</button>
  </div>
  <div className="grid grid-cols-7 gap-1 text-center text-sm">
    {['一','二','三','四','五','六','日'].map(d => <span key={d} className="text-zinc-400 text-xs py-1">{d}</span>)}
    {days.map(d => <button key={d} className="h-9 w-9 rounded hover:bg-zinc-100">{d}</button>)}
  </div>
</div>` },
  { name: "TimePicker", category: "form", description: "时间选择器，支持 12/24 小时制。", platform: ["desktop", "mobile"], tags: ["时间", "选择", "表单"], variants: ["12h", "24h", "withSeconds"], accessibility: "使用 spinbutton role 或独立输入字段", complexity: "medium", designTokens: { borderRadius: "0.5rem", height: "2.5rem" }, related: ["DatePicker", "DateTimePicker"], codeExample: `<div className="flex items-center gap-1">
  <Input className="w-16 text-center" placeholder="时" />
  <span>:</span>
  <Input className="w-16 text-center" placeholder="分" />
  <Select>
    <SelectTrigger className="w-16"><SelectValue placeholder="AM" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="am">AM</SelectItem>
      <SelectItem value="pm">PM</SelectItem>
    </SelectContent>
  </Select>
</div>` },
  { name: "DateTimePicker", category: "form", description: "日期时间选择器，同时选择日期和时间。", platform: ["desktop"], tags: ["日期", "时间", "选择"], variants: ["default", "inline", "modal"], accessibility: "日期和时间区域分别标记，Tab 键切换", complexity: "complex", designTokens: { borderRadius: "0.5rem" }, related: ["DatePicker", "TimePicker"], codeExample: `<div className="flex gap-2">
  <DatePicker />
  <TimePicker />
</div>` },
  { name: "FileUpload", category: "form", description: "文件上传，支持拖拽、多文件和预览。", platform: ["desktop", "mobile"], tags: ["上传", "文件", "拖拽"], variants: ["dragDrop", "button", "withPreview", "multiple"], accessibility: "拖拽区域需设置 role='button'，文件列表使用 listbox role", complexity: "medium", designTokens: { borderStyle: "dashed", borderRadius: "0.5rem", padding: "2rem" }, related: ["ImageUpload", "Dropzone", "FilePreview"], codeExample: `<div className="rounded-lg border-2 border-dashed p-8 text-center hover:border-zinc-400 transition-colors">
  <Upload className="mx-auto h-8 w-8 text-zinc-400" />
  <p className="mt-2 text-sm text-zinc-500">拖拽文件到此处，或点击上传</p>
  <p className="mt-1 text-xs text-zinc-400">支持 PNG、JPG，最大 10MB</p>
</div>` },
  { name: "ImageUpload", category: "form", description: "图片上传组件，支持裁剪和预览。", platform: ["desktop", "mobile"], tags: ["上传", "图片", "预览"], variants: ["avatar", "cover", "gallery", "withCrop"], accessibility: "上传按钮描述清晰，预览图提供有意义的 alt", complexity: "medium", designTokens: { borderRadius: "0.5rem", aspectRatio: "1/1" }, related: ["FileUpload", "Avatar", "ImageEditor"], codeExample: `<div className="flex flex-col items-center gap-3">
  <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed bg-zinc-50">
    <Camera className="h-8 w-8 text-zinc-400" />
  </div>
  <Button variant="outline" size="sm">选择图片</Button>
</div>` },
  { name: "Dropzone", category: "form", description: "拖拽上传区域，支持文件类型过滤。", platform: ["desktop"], tags: ["拖拽", "上传", "文件"], variants: ["default", "compact", "withPreview"], accessibility: "设置 role='region' aria-label 描述区域功能", complexity: "medium", designTokens: { borderStyle: "dashed", borderRadius: "0.5rem" }, related: ["FileUpload", "ImageUpload"], codeExample: `<Dropzone onDrop={handleDrop}>
  <div className="flex flex-col items-center">
    <Upload className="h-10 w-10 text-zinc-400" />
    <p className="text-sm">拖拽文件到此处</p>
  </div>
</Dropzone>` },
  { name: "RichTextEditor", category: "form", description: "富文本编辑器，支持格式化文本。", platform: ["desktop"], tags: ["编辑", "富文本", "格式化"], variants: ["minimal", "full", "inline"], accessibility: "工具栏使用 toolbar role，编辑区域使用 textbox role", complexity: "complex", designTokens: { borderRadius: "0.5rem", minHeight: "12rem" }, related: ["Textarea", "MarkdownEditor", "CodeEditor"], codeExample: `<div className="rounded-lg border">
  <div className="flex gap-1 border-b p-2">
    <button className="rounded p-1 hover:bg-zinc-100" aria-label="加粗"><Bold className="h-4 w-4" /></button>
    <button className="rounded p-1 hover:bg-zinc-100" aria-label="斜体"><Italic className="h-4 w-4" /></button>
    <button className="rounded p-1 hover:bg-zinc-100" aria-label="下划线"><Underline className="h-4 w-4" /></button>
    <Separator orientation="vertical" className="h-6" />
    <button className="rounded p-1 hover:bg-zinc-100" aria-label="列表"><List className="h-4 w-4" /></button>
  </div>
  <div className="p-3 min-h-[12rem]" contentEditable />
</div>` },
  { name: "MarkdownEditor", category: "form", description: "Markdown 编辑器，支持实时预览。", platform: ["desktop"], tags: ["编辑", "Markdown", "预览"], variants: ["edit", "preview", "split"], accessibility: "编辑区和预览区使用独立的标签", complexity: "medium", designTokens: { borderRadius: "0.5rem", minHeight: "16rem" }, related: ["RichTextEditor", "CodeEditor", "MarkdownRenderer"], codeExample: `<div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
  <textarea className="p-4 min-h-[16rem] focus:outline-none" placeholder="输入 Markdown..." />
  <div className="p-4 border-l bg-zinc-50 prose prose-sm" />
</div>` },
  { name: "CodeEditor", category: "form", description: "代码编辑器，支持语法高亮和自动补全。", platform: ["desktop"], tags: ["编辑", "代码", "语法"], variants: ["default", "readonly", "withLineNumbers"], accessibility: "使用 textbox role，支持标准编辑快捷键", complexity: "complex", designTokens: { fontFamily: "monospace", fontSize: "0.8125rem", minHeight: "12rem" }, related: ["MarkdownEditor", "Code"], codeExample: `<div className="rounded-lg border overflow-hidden">
  <div className="flex items-center gap-2 border-b bg-zinc-50 px-4 py-2">
    <span className="h-3 w-3 rounded-full bg-red-400" />
    <span className="h-3 w-3 rounded-full bg-yellow-400" />
    <span className="h-3 w-3 rounded-full bg-green-400" />
    <span className="ml-2 text-xs text-zinc-500">index.tsx</span>
  </div>
  <pre className="p-4 text-sm font-mono"><code>{code}</code></pre>
</div>` },
  { name: "Slider", category: "form", description: "滑块，用于选择范围内的数值。", platform: ["desktop", "mobile", "tablet"], tags: ["选择", "数值", "滑动"], variants: ["default", "range", "withMarks"], accessibility: "使用 slider role，aria-valuenow/aria-valuemin/aria-valuemax", complexity: "medium", designTokens: { trackHeight: "4px", thumbSize: "16px" }, related: ["NumberInput", "Progress", "RangeSlider"], codeExample: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>音量</span>
    <span>{value}%</span>
  </div>
  <input type="range" className="w-full h-2 rounded-full appearance-none bg-zinc-200" min={0} max={100} />
</div>` },
  { name: "RangeSlider", category: "form", description: "范围滑块，选择数值区间。", platform: ["desktop"], tags: ["选择", "范围", "区间"], variants: ["default", "withInputs"], accessibility: "两个滑块都使用 slider role，正确设置 value 范围", complexity: "medium", designTokens: { trackHeight: "4px", thumbSize: "16px" }, related: ["Slider", "PriceRange"], codeExample: `<div className="relative h-2 bg-zinc-200 rounded-full">
  <div className="absolute h-full bg-zinc-900 rounded-full" style={{left: '20%', right: '30%'}} />
  <input type="range" className="absolute w-full appearance-none bg-transparent pointer-events-none" />
</div>` },
  { name: "SwitchGroup", category: "form", description: "开关组，多个开关项的组合。", platform: ["desktop", "mobile", "tablet"], tags: ["开关", "设置", "选项"], variants: ["default", "card", "withDescription"], accessibility: "每个开关独立 label，组使用 fieldset+legend", complexity: "simple", designTokens: { gap: "0.75rem" }, related: ["Switch", "CheckboxGroup", "Settings"], codeExample: `<fieldset className="space-y-3">
  <legend className="text-sm font-medium">通知设置</legend>
  <div className="flex items-center justify-between">
    <label className="text-sm">邮件通知</label>
    <Switch />
  </div>
  <div className="flex items-center justify-between">
    <label className="text-sm">推送通知</label>
    <Switch />
  </div>
</fieldset>` },
  { name: "CheckboxGroup", category: "form", description: "复选框组，多选项目组。", platform: ["desktop", "mobile", "tablet"], tags: ["选择", "多选", "表单"], variants: ["default", "card", "grid"], accessibility: "使用 fieldset+legend 包裹，每个 checkbox 独立 label", complexity: "simple", designTokens: { gap: "0.5rem" }, related: ["Checkbox", "SwitchGroup", "MultiSelect"], codeExample: `<fieldset>
  <legend className="text-sm font-medium mb-2">兴趣爱好</legend>
  <div className="space-y-2">
    {['阅读','运动','音乐','旅行'].map(hobby => (
      <label key={hobby} className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="rounded" /> {hobby}
      </label>
    ))}
  </div>
</fieldset>` },
  { name: "RadioCard", category: "form", description: "卡片式单选，用卡片展现选项。", platform: ["desktop", "mobile", "tablet"], tags: ["选择", "卡片", "单选"], variants: ["default", "withIcon", "withImage"], accessibility: "使用 radiogroup role 包裹", complexity: "simple", designTokens: { borderRadius: "0.75rem", padding: "1rem" }, related: ["RadioGroup", "SelectCard"], codeExample: `<fieldset className="grid grid-cols-3 gap-3">
  {plans.map(plan => (
    <label key={plan.id} className="cursor-pointer rounded-xl border p-4 has-[:checked]:border-zinc-900 has-[:checked]:bg-zinc-50">
      <input type="radio" name="plan" value={plan.id} className="sr-only" />
      <h3 className="font-semibold">{plan.name}</h3>
      <p className="text-sm text-zinc-500">{plan.price}</p>
    </label>
  ))}
</fieldset>` },
  { name: "MultiSelect", category: "form", description: "多选下拉，从列表中选择多个选项。", platform: ["desktop"], tags: ["选择", "多选", "标签"], variants: ["default", "withChips", "grouped"], accessibility: "使用 multiselect role 或 listbox+checkbox 模式", complexity: "medium", designTokens: { borderRadius: "0.5rem", tagGap: "0.25rem" }, related: ["Select", "Combobox", "Chip"], codeExample: `<div className="relative">
  <div className="flex flex-wrap gap-1 rounded-lg border p-2 min-h-[2.5rem]">
    <Chip>React <button aria-label="移除">&times;</button></Chip>
    <Chip>Vue <button aria-label="移除">&times;</button></Chip>
    <input className="flex-1 min-w-[80px] border-0 focus:outline-none text-sm" placeholder="添加..." />
  </div>
</div>` },
  { name: "TagInput", category: "form", description: "标签输入，输入并按回车添加标签。", platform: ["desktop", "mobile"], tags: ["输入", "标签", "多值"], variants: ["default", "withSuggestions"], accessibility: "每个标签可独立删除，输入建议使用 listbox", complexity: "medium", designTokens: { borderRadius: "0.5rem", tagRadius: "9999px" }, related: ["Chip", "MultiSelect", "Input"], codeExample: `<div className="flex flex-wrap gap-2 rounded-lg border p-2">
  {tags.map(tag => (
    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-sm">
      {tag}
      <button aria-label={"删除 React"} className="hover:text-red-500">&times;</button>
    </span>
  ))}
  <input className="flex-1 border-0 focus:outline-none text-sm" placeholder="输入后按回车添加" />
</div>` },
  { name: "Autocomplete", category: "form", description: "自动补全输入，输入时显示匹配建议。", platform: ["desktop", "mobile"], tags: ["输入", "自动补全", "建议"], variants: ["default", "withHighlight", "async"], accessibility: "使用 combobox role，aria-autocomplete='list'", complexity: "medium", designTokens: { borderRadius: "0.5rem", suggestionMaxHeight: "15rem" }, related: ["Combobox", "SearchInput", "Select"], codeExample: `<div className="relative">
  <Input placeholder="搜索城市..." />
  <ul className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg overflow-hidden">
    <li className="px-3 py-2 hover:bg-zinc-100 cursor-pointer">北京</li>
    <li className="px-3 py-2 hover:bg-zinc-100 cursor-pointer">上海</li>
  </ul>
</div>` },
  { name: "ColorPicker", category: "form", description: "颜色选择器，支持色板、HEX 和透明度。", platform: ["desktop"], tags: ["颜色", "选择", "设计"], variants: ["swatches", "picker", "input", "withAlpha"], accessibility: "提供 hex 输入框作为键盘输入替代方案", complexity: "complex", designTokens: { swatchSize: "1.5rem", borderRadius: "0.5rem" }, related: ["Input", "ThemeEditor"], codeExample: `<div className="flex items-center gap-3">
  <div className="relative h-8 w-8 rounded-lg border overflow-hidden">
    <input type="color" className="absolute inset-0 w-full h-full cursor-pointer opacity-0" />
  </div>
  <Input className="w-28 font-mono text-sm" value="#3B82F6" />
  <div className="flex gap-1">
    {['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6'].map(c => (
      <button key={c} className="h-6 w-6 rounded-full border" style={{background: c}} />
    ))}
  </div>
</div>` },
  { name: "OTPInput", category: "form", description: "一次性密码输入，分格输入验证码。", platform: ["desktop", "mobile"], tags: ["输入", "验证码", "安全"], variants: ["numeric", "alphanumeric", "withSeparator"], accessibility: "使用多个 input 或单个 input，支持粘贴填充", complexity: "medium", designTokens: { cellSize: "2.75rem", borderRadius: "0.5rem", gap: "0.5rem" }, related: ["Input", "PinInput", "VerificationCode"], codeExample: `<div className="flex gap-2">
  {Array.from({length: 6}).map((_, i) => (
    <input key={i} className="h-12 w-10 rounded-lg border text-center text-lg font-semibold" maxLength={1} />
  ))}
</div>` },
  { name: "PhoneInput", category: "form", description: "手机号输入，支持国家区号选择。", platform: ["desktop", "mobile"], tags: ["输入", "手机", "国际化"], variants: ["default", "withFlag"], accessibility: "区号选择器独立 label，号码输入关联 label", complexity: "medium", designTokens: { borderRadius: "0.5rem", height: "2.5rem" }, related: ["Input", "Select", "FormField"], codeExample: `<div className="flex">
  <Select>
    <SelectTrigger className="w-24 rounded-r-none"><SelectValue placeholder="+86" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="+86">🇨🇳 +86</SelectItem>
      <SelectItem value="+1">🇺🇸 +1</SelectItem>
    </SelectContent>
  </Select>
  <Input className="rounded-l-none flex-1" type="tel" placeholder="手机号" />
</div>` },
  { name: "SignaturePad", category: "form", description: "手写签名板，支持触摸和鼠标签名。", platform: ["desktop", "mobile", "tablet"], tags: ["签名", "手写", "表单"], variants: ["default", "withClear"], accessibility: "提供键盘输入姓名作为签名替代方案", complexity: "complex", designTokens: { borderRadius: "0.5rem", borderStyle: "dashed", minHeight: "8rem" }, related: ["FileUpload", "Canvas"], codeExample: `<div className="rounded-lg border-2 border-dashed p-2">
  <canvas className="h-40 w-full rounded" />
  <div className="mt-2 flex justify-between">
    <span className="text-xs text-zinc-400">在此处签名</span>
    <button className="text-xs text-zinc-500 hover:text-zinc-700">清除</button>
  </div>
</div>` },
  { name: "StarRating", category: "form", description: "星级评分，支持分数和自定义图标。", platform: ["desktop", "mobile"], tags: ["评分", "评价", "交互"], variants: ["default", "readonly", "withText", "emoji"], accessibility: "使用 slider role 或 radio group", complexity: "medium", designTokens: { starSize: "1.5rem", starGap: "0.25rem" }, related: ["Slider", "RadioGroup", "FeedbackForm"], codeExample: `<div className="flex items-center gap-1" role="radiogroup" aria-label="评分">
  {[1,2,3,4,5].map(i => (
    <button key={i} className="text-2xl" role="radio" aria-label={"3星"} aria-checked={rating === i}>
      {i <= rating ? '⭐' : '☆'}
    </button>
  ))}
  <span className="ml-2 text-sm text-zinc-500">{rating}/5</span>
</div>` },
  { name: "EmojiPicker", category: "form", description: "表情选择器，分类展示表情符号。", platform: ["desktop", "mobile"], tags: ["表情", "选择", "社交"], variants: ["default", "compact", "reactions"], accessibility: "使用 grid role，每个表情用 button 并设 aria-label", complexity: "medium", designTokens: { emojiSize: "2rem", borderRadius: "0.5rem" }, related: ["ReactionPicker", "ColorPicker"], codeExample: `<div className="rounded-lg border p-3 w-72">
  <div className="flex border-b pb-2 gap-1 mb-2">
    {['😀','🐱','🍕','🚗','⚡'].map(cat => <button key={cat} className="w-8 h-8 rounded hover:bg-zinc-100">{cat}</button>)}
  </div>
  <div className="grid grid-cols-8 gap-1">
    {['😀','😂','🥰','😎','🤔','😴','😡','👍','👏','🎉','❤️','🔥','✨','💪','🙏','🌟'].map(e => (
      <button key={e} className="h-8 w-8 text-lg hover:bg-zinc-100 rounded">{e}</button>
    ))}
  </div>
</div>` },
  { name: "MediaRecorder", category: "form", description: "媒体录制器，录音或录视频。", platform: ["desktop", "mobile"], tags: ["录制", "音频", "视频", "媒体"], variants: ["audio", "video"], accessibility: "录音按钮设置 aria-label 和状态提示", complexity: "complex", designTokens: { borderRadius: "0.5rem" }, related: ["FileUpload", "VoiceInput"], codeExample: `<div className="flex items-center gap-4">
  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600" aria-label="开始录音">
    <Mic className="h-5 w-5" />
  </button>
  <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
    <div className="h-full bg-red-500 w-1/3" />
  </div>
  <span className="text-sm tabular-nums">00:32</span>
</div>` },
  { name: "CreditCardInput", category: "form", description: "信用卡输入，自动识别卡号和格式化。", platform: ["desktop", "mobile"], tags: ["支付", "信用卡", "格式化"], variants: ["default", "withIcon", "compact"], accessibility: "使用 autocomplete='cc-number' 等属性", complexity: "medium", designTokens: { borderRadius: "0.5rem", height: "2.5rem" }, related: ["Input", "FormField", "PaymentForm"], codeExample: `<div className="space-y-3 rounded-lg border p-4">
  <Input placeholder="卡号 1234 5678 9012 3456" className="font-mono" />
  <div className="flex gap-3">
    <Input placeholder="MM/YY" className="w-24" />
    <Input placeholder="CVV" className="w-20" />
  </div>
</div>` },
  { name: "VoiceInput", category: "form", description: "语音输入，使用语音转文字。", platform: ["desktop", "mobile"], tags: ["语音", "输入", "识别"], variants: ["default", "pulse"], accessibility: "使用 aria-label 描述录音状态", complexity: "complex", designTokens: { borderRadius: "0.5rem" }, related: ["Input", "MediaRecorder", "SearchInput"], codeExample: `<div className="relative">
  <Input placeholder="点击麦克风开始语音输入" />
  <button className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 animate-pulse" aria-label="正在录音">
    <Mic className="h-3 w-3 text-white" />
  </button>
</div>` },
];
