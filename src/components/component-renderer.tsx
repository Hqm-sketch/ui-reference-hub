"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Search, Settings, Mail, Menu, Home, User, Bell, Heart, Star, Share2,
  ChevronRight, Info, AlertCircle, CheckCircle, AlertTriangle, X, Plus,
  Loader2, ShoppingCart, CreditCard, Camera, Mic, Upload, Eye, EyeOff,
  Bold, Italic, Underline, List, Copy, Check, ChevronDown, ArrowUp,
  LayoutDashboard, BarChart3, TrendingUp, MapPin, Lock, Calendar,
  Folder, File, Inbox, Sparkles, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentRendererProps {
  componentName: string;
  category: string;
  variants: string[];
}

export function ComponentRenderer({ componentName, category, variants }: ComponentRendererProps) {
  const name = componentName.toLowerCase();

  // --- Basic Components ---
  if (name === "button") return <ButtonShowcase />;
  if (name === "iconbutton") return <IconButtonShowcase />;
  if (name === "buttongroup") return <ButtonGroupShowcase />;
  if (name === "loadingbutton") return <LoadingButtonShowcase />;
  if (name === "badge") return <BadgeShowcase />;
  if (name === "input") return <InputShowcase />;
  if (name === "textarea") return <TextareaShowcase />;
  if (name === "searchinput") return <SearchInputShowcase />;
  if (name === "passwordinput") return <PasswordInputShowcase />;
  if (name === "spinner") return <SpinnerShowcase />;
  if (name === "skeleton") return <SkeletonShowcase />;
  if (name === "toggle" || name === "switch") return <ToggleShowcase />;
  if (name === "checkbox") return <CheckboxShowcase />;
  if (name === "radiogroup") return <RadioShowcase />;
  if (name === "select") return <SelectShowcase />;
  if (name === "combobox") return <ComboboxShowcase />;
  if (name === "avatar") return <AvatarShowcase />;
  if (name === "avatargroup") return <AvatarGroupShowcase />;
  if (name === "tooltip") return <TooltipShowcase />;
  if (name === "statusdot") return <StatusDotShowcase />;
  if (name === "kbd") return <KbdShowcase />;
  if (name === "code") return <CodeShowcase />;
  if (name === "link" || name === "typography") return <TypographyShowcase />;
  if (name === "divider") return <DividerShowcase />;
  if (name === "scrollarea") return <ScrollShowcase />;

  // --- Layout ---
  if (name === "card") return <CardShowcase />;
  if (name === "tabs") return <TabsShowcase />;
  if (name === "accordion") return <AccordionShowcase />;
  if (name === "emptystate") return <EmptyStateShowcase />;
  if (name === "errorstate") return <ErrorStateShowcase />;

  // --- Navigation ---
  if (name === "breadcrumb") return <BreadcrumbShowcase />;
  if (name === "dropdownmenu") return <DropdownShowcase />;
  if (name === "pagination") return <PaginationShowcase />;
  if (name === "stepper") return <StepperShowcase />;

  // --- Feedback ---
  if (name === "alert") return <AlertShowcase />;
  if (name === "toast") return <ToastShowcase />;
  if (name === "dialog" || name === "modal") return <DialogShowcase />;
  if (name === "confirmdialog") return <ConfirmDialogShowcase />;
  if (name === "result") return <ResultShowcase />;
  if (name === "banner") return <BannerShowcase />;
  if (name === "progress") return <ProgressShowcase />;
  if (name === "scoreboard") return <ScoreBoardShowcase />;

  // --- Data Display ---
  if (name === "statcard") return <StatCardShowcase />;
  if (name === "timeline") return <TimelineShowcase />;
  if (name === "carousel") return <CarouselShowcase />;

  // --- Form ---
  if (name === "starrating") return <StarRatingShowcase />;
  if (name === "slider") return <SliderShowcase />;
  if (name === "switchgroup") return <SwitchGroupShowcase />;
  if (name === "taginput") return <TagInputShowcase />;
  if (name === "datepicker") return <DatePickerShowcase />;
  if (name === "otpinput") return <OtpInputShowcase />;

  // --- Mobile ---
  if (name === "bottomsheet") return <BottomSheetShowcase />;
  if (name === "actionsheet") return <ActionSheetShowcase />;
  if (name === "floatingactionbutton") return <FabShowcase />;
  if (name === "bottomnavigation") return <BottomNavShowcase />;

  // --- App-level components ---
  if (name === "bottomtabnav" || name === "底部导航栏") return <BottomTabNavShowcase />;
  if (name === "datacard" || name === "数据卡片") return <DataCardShowcase />;
  if (name === "contentblock" || name === "内容区块") return <ContentBlockShowcase />;
  if (name === "settingslist" || name === "设置列表") return <SettingsListShowcase />;
  if (name === "calendarview" || name === "日历视图") return <CalendarViewShowcase />;
  if (name === "formgroup" || name === "表单组") return <FormGroupShowcase />;
  if (name === "transactionitem" || name === "交易记录") return <TransactionItemShowcase />;
  if (name === "chartplaceholder" || name === "图表占位") return <ChartPlaceholderShowcase />;
  if (name === "searchbar" || name === "搜索栏") return <SearchBarShowcase />;
  if (name === "pageheader" || name === "页面标题") return <PageHeaderShowcase />;
  if (name === "statrow" || name === "统计行") return <StatRowShowcase />;
  if (name === "blankslot" || name === "空白占位") return <BlankSlotShowcase />;
  if (name === "listgroup" || name === "列表组") return <ListGroupShowcase />;

  // --- Overlay components ---
  if (name === "角标" || name === "cornerbadge") return <CornerBadgeShowcase />;
  if (name === "图标" || name === "overlayicon") return <OverlayIconShowcase />;
  if (name === "文字标签" || name === "textlabel") return <TextLabelShowcase />;
  if (name === "按钮叠加" || name === "overlaybutton") return <OverlayButtonShowcase />;

  // --- Scene: Chat/Social ---
  if (name === "消息气泡" || name === "chatbubble") return <ChatBubbleShowcase />;
  if (name === "聊天输入栏" || name === "chatinput") return <ChatInputShowcase />;
  if (name === "用户信息卡" || name === "userinfocard") return <UserInfoShowcase />;
  if (name === "联系人列表" || name === "contactlist") return <ContactListShowcase />;

  // --- Scene: E-commerce ---
  if (name === "商品卡片" || name === "productcard") return <ProductCardShowcase />;
  if (name === "订单摘要" || name === "ordersummary") return <OrderSummaryShowcase />;
  if (name === "价格标签" || name === "pricetag") return <PriceTagShowcase />;
  if (name === "评价卡片" || name === "reviewcard") return <ReviewCardShowcase />;
  if (name === "购物车项" || name === "cartitem") return <CartItemShowcase />;

  // --- Scene: Media/Health ---
  if (name === "音乐播放条" || name === "musicplayer") return <MusicPlayerShowcase />;
  if (name === "歌单卡片" || name === "playlistcard") return <PlaylistCardShowcase />;
  if (name === "步数卡片" || name === "stepscard") return <StepsCardShowcase />;
  if (name === "签到卡片" || name === "checkincard") return <CheckInShowcase />;

  // --- Scene: General ---
  if (name === "功能入口" || name === "featuregrid") return <FeatureGridShowcase />;
  if (name === "标签筛选栏" || name === "tagfilter") return <TagFilterShowcase />;
  if (name === "公告横幅" || name === "announcement") return <AnnouncementShowcase />;
  if (name === "进度环" || name === "progressring") return <ProgressRingShowcase />;

  // --- Default ---
  return <GenericShowcase name={componentName} variants={variants} />;
}

// ============ SHOWCASE COMPONENTS ============

function ButtonShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>默认按钮</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="outline">边框</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="destructive">危险</Button>
      <Button variant="link">链接</Button>
      <Button size="lg">大</Button>
      <Button size="sm">小</Button>
      <Button disabled>禁用</Button>
      <Button>
        <Search className="mr-2 h-4 w-4" /> 搜索
      </Button>
    </div>
  );
}

function IconButtonShowcase() {
  return (
    <div className="flex items-center gap-2">
      <Button size="icon" aria-label="搜索"><Search className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost" aria-label="设置"><Settings className="h-4 w-4" /></Button>
      <Button size="icon" variant="outline" aria-label="邮件"><Mail className="h-4 w-4" /></Button>
      <Button size="icon" variant="destructive" aria-label="删除"><X className="h-4 w-4" /></Button>
    </div>
  );
}

function ButtonGroupShowcase() {
  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group">
      <button className="rounded-l-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">左</button>
      <button className="border-y border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">中</button>
      <button className="rounded-r-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">右</button>
    </div>
  );
}

function LoadingButtonShowcase() {
  return (
    <div className="flex items-center gap-3">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 加载中...
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 提交中...
      </Button>
    </div>
  );
}

function BadgeShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>默认</Badge>
      <Badge variant="secondary">次要</Badge>
      <Badge variant="success">成功</Badge>
      <Badge variant="warning">警告</Badge>
      <Badge variant="destructive">危险</Badge>
      <Badge variant="outline">边框</Badge>
    </div>
  );
}

function InputShowcase() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <Input placeholder="请输入内容" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium">邮箱 <span className="text-red-500">*</span></label>
        <Input type="email" placeholder="请输入邮箱" />
        <p className="text-xs text-zinc-500">我们将不会分享您的邮箱</p>
      </div>
      <Input disabled placeholder="禁用状态" />
      <Input aria-invalid placeholder="错误状态" className="border-red-500" />
    </div>
  );
}

function TextareaShowcase() {
  return (
    <textarea
      className="flex min-h-24 w-full max-w-sm rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400"
      placeholder="请输入详细描述..."
    />
  );
}

function SearchInputShowcase() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
      <Input className="pl-8" placeholder="搜索..." />
      <kbd className="absolute right-2.5 top-2.5 rounded border bg-white px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">⌘K</kbd>
    </div>
  );
}

function PasswordInputShowcase() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative w-full max-w-sm">
      <Input type={show ? "text" : "password"} placeholder="请输入密码" />
      <button className="absolute right-2.5 top-2.5 rounded p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={() => setShow(!show)} aria-label={show ? "隐藏" : "显示"}>
        {show ? <EyeOff className="h-4 w-4 text-zinc-400" /> : <Eye className="h-4 w-4 text-zinc-400" />}
      </button>
    </div>
  );
}

function SpinnerShowcase() {
  return (
    <div className="flex items-center gap-4">
      <Loader2 className="h-4 w-4 animate-spin" />
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-zinc-500">加载中...</span>
      </div>
    </div>
  );
}

function SkeletonShowcase() {
  return (
    <div className="w-full max-w-sm space-y-3 animate-pulse">
      <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-20 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

function ToggleShowcase() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-sm">飞行模式</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notify" defaultChecked />
        <label htmlFor="notify" className="text-sm">通知</label>
      </div>
    </div>
  );
}

function CheckboxShowcase() {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" defaultChecked /> 我同意服务条款
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" /> 订阅邮件通知
      </label>
      <label className="flex items-center gap-2 text-sm text-zinc-400">
        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" disabled /> 不可用选项
      </label>
    </div>
  );
}

function RadioShowcase() {
  const [value, setValue] = React.useState("free");
  return (
    <fieldset>
      <legend className="text-sm font-medium mb-2">选择方案</legend>
      <div className="space-y-2">
        {[{id:"free",label:"免费版",desc:"基础功能"},{id:"pro",label:"专业版",desc:"高级功能"},{id:"enterprise",label:"企业版",desc:"全部功能"}].map(p => (
          <label key={p.id} className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${value === p.id ? "border-zinc-900 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800/50" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}`}>
            <input type="radio" name="plan" value={p.id} checked={value === p.id} onChange={e => setValue(e.target.value)} className="mt-0.5" />
            <div><div className="text-sm font-medium">{p.label}</div><div className="text-xs text-zinc-500">{p.desc}</div></div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SelectShowcase() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="选择框架" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="angular">Angular</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  );
}

function ComboboxShowcase() {
  const [query, setQuery] = React.useState("");
  const items = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt"].filter(i => i.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="relative w-48">
      <Input placeholder="搜索框架..." value={query} onChange={e => setQuery(e.target.value)} />
      {query && items.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {items.map(i => <li key={i} className="cursor-pointer px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setQuery(i)}>{i}</li>)}
        </ul>
      )}
    </div>
  );
}

function AvatarShowcase() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium dark:bg-zinc-700">ZS</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-sm font-medium text-blue-700 ring-2 ring-white">AV</div>
      <div className="relative h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      </div>
    </div>
  );
}

function AvatarGroupShowcase() {
  return (
    <div className="flex -space-x-2">
      {["bg-red-200", "bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-purple-200"].map((c, i) => (
        <div key={i} className={`h-8 w-8 rounded-full ${c} ring-2 ring-white flex items-center justify-center text-xs font-medium`}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-white text-xs text-zinc-500 dark:bg-zinc-800">+5</div>
    </div>
  );
}

function TooltipShowcase() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
      </TooltipTrigger>
      <TooltipContent><p>这是一个提示信息</p></TooltipContent>
    </Tooltip>
  );
}

function StatusDotShowcase() {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /><span className="text-sm">在线</span></span>
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-zinc-400" /><span className="text-sm">离线</span></span>
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /><span className="text-sm">忙碌</span></span>
    </div>
  );
}

function KbdShowcase() {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800">⌘</kbd>
      <span>+</span>
      <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800">K</kbd>
      <span className="text-zinc-400">打开搜索</span>
    </div>
  );
}

function CodeShowcase() {
  return (
    <pre className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100 dark:bg-zinc-900">
      <code>{`const greeting = "Hello, World!";
console.log(greeting);

function Button({ children }) {
  return <button>{children}</button>;
}`}</code>
    </pre>
  );
}

function TypographyShowcase() {
  return (
    <div className="space-y-3 max-w-md">
      <h1 className="text-3xl font-bold">一级标题</h1>
      <h2 className="text-xl font-semibold">二级标题</h2>
      <h3 className="text-base font-medium">三级标题</h3>
      <p className="text-base leading-7">正文段落，良好的行高提升可读性。</p>
      <p className="text-sm text-zinc-500">辅助说明文字</p>
      <p className="text-xs text-zinc-400">次要信息</p>
      <a className="text-blue-600 hover:underline" href="#">这是一个链接</a>
    </div>
  );
}

function DividerShowcase() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div><p className="text-sm">上方内容</p><Separator className="my-3" /><p className="text-sm">下方内容</p></div>
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-sm text-zinc-400">或</span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}

function ScrollShowcase() {
  return (
    <ScrollArea className="h-40 w-full max-w-sm rounded-lg border">
      <div className="p-4 space-y-3">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-800">列表项 {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  );
}

function CardShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>基础卡片</CardTitle>
          <CardDescription>这是一个基础卡片组件</CardDescription>
        </CardHeader>
        <CardContent><p className="text-sm text-zinc-500">卡片内容区域，可以放置任何内容。</p></CardContent>
        <CardFooter className="flex gap-2">
          <Button size="sm">确认</Button>
          <Button size="sm" variant="ghost">取消</Button>
        </CardFooter>
      </Card>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><BarChart3 className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-zinc-500">总收入</p>
              <p className="text-2xl font-bold">¥128,450</p>
              <p className="flex items-center gap-1 text-xs text-green-600"><TrendingUp className="h-3 w-3" /> +12.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TabsShowcase() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">账户</TabsTrigger>
        <TabsTrigger value="password">密码</TabsTrigger>
        <TabsTrigger value="billing">账单</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-zinc-500 p-4 border rounded-lg mt-3">账户设置内容</TabsContent>
      <TabsContent value="password" className="text-sm text-zinc-500 p-4 border rounded-lg mt-3">密码修改内容</TabsContent>
      <TabsContent value="billing" className="text-sm text-zinc-500 p-4 border rounded-lg mt-3">账单管理内容</TabsContent>
    </Tabs>
  );
}

function AccordionShowcase() {
  return (
    <div className="w-full max-w-sm divide-y border rounded-lg">
      {["什么是 UI 组件？", "如何选择组件？", "组件如何定制？"].map((title, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800">
            {title}
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 text-sm text-zinc-500">这是 {title} 的详细内容。可以放任何东西。</div>
        </details>
      ))}
    </div>
  );
}

function EmptyStateShowcase() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <Inbox className="h-12 w-12 text-zinc-300" />
      <h3 className="mt-4 text-lg font-semibold">暂无数据</h3>
      <p className="mt-1 text-sm text-zinc-500">开始创建第一条记录吧</p>
      <Button className="mt-4" size="sm"><Plus className="mr-2 h-4 w-4" />创建</Button>
    </div>
  );
}

function ErrorStateShowcase() {
  return (
    <div className="flex flex-col items-center py-12 text-center" role="alert">
      <AlertTriangle className="h-12 w-12 text-red-400" />
      <h3 className="mt-4 text-lg font-semibold">加载失败</h3>
      <p className="mt-1 text-sm text-zinc-500">请检查网络连接后重试</p>
      <Button variant="outline" className="mt-4" size="sm"><RefreshCw className="mr-2 h-4 w-4" />重试</Button>
    </div>
  );
}

function BreadcrumbShowcase() {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
      <a className="hover:text-zinc-900 dark:hover:text-zinc-100">首页</a>
      <ChevronRight className="h-3.5 w-3.5" />
      <a className="hover:text-zinc-900 dark:hover:text-zinc-100">组件</a>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="font-medium text-zinc-900 dark:text-zinc-100">Button</span>
    </nav>
  );
}

function DropdownShowcase() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">操作 <ChevronDown className="ml-2 h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>编辑</DropdownMenuItem>
        <DropdownMenuItem>复制</DropdownMenuItem>
        <DropdownMenuItem>分享</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PaginationShowcase() {
  return (
    <nav className="flex items-center gap-1">
      <button className="h-8 w-8 rounded border text-sm" aria-label="上一页">‹</button>
      {[1, 2, 3, 4, 5].map(p => (
        <button key={p} className={`h-8 w-8 rounded border text-sm ${p === 1 ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>{p}</button>
      ))}
      <button className="h-8 w-8 rounded border text-sm" aria-label="下一页">›</button>
    </nav>
  );
}

function StepperShowcase() {
  const steps = ["选择方案", "填写信息", "确认订单", "完成支付"];
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${i <= 1 ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"}`}>{i + 1}</span>
            <span className={`text-sm ${i <= 1 ? "font-medium" : "text-zinc-400"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`mx-3 h-px flex-1 ${i < 1 ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-200 dark:bg-zinc-700"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function AlertShowcase() {
  return (
    <div className="space-y-3 w-full max-w-md">
      {[
        { icon: Info, color: "blue", title: "提示", msg: "这是一条普通提示信息" },
        { icon: CheckCircle, color: "green", title: "成功", msg: "操作已成功完成" },
        { icon: AlertTriangle, color: "amber", title: "警告", msg: "请注意检查输入内容" },
        { icon: AlertCircle, color: "red", title: "错误", msg: "发生了未知错误，请重试" },
      ].map((a, i) => (
        <div key={i} className={`rounded-lg border-l-4 border-${a.color}-500 bg-${a.color}-50 dark:bg-${a.color}-950/30 p-4`}>
          <div className="flex items-center gap-2">
            <a.icon className={`h-4 w-4 text-${a.color}-500`} />
            <p className={`text-sm font-medium text-${a.color}-900 dark:text-${a.color}-200`}>{a.title}</p>
          </div>
          <p className={`mt-1 text-sm text-${a.color}-700 dark:text-${a.color}-300`}>{a.msg}</p>
        </div>
      ))}
    </div>
  );
}

function AlertCustom({ icon: Icon, color, title, msg }: { icon: React.ComponentType<{className?: string}>; color: string; title: string; msg: string }) {
  const colors: Record<string, { border: string; bg: string; text: string; icon: string }> = {
    blue: { border: "border-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-900 dark:text-blue-200", icon: "text-blue-500" },
    green: { border: "border-green-500", bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-900 dark:text-green-200", icon: "text-green-500" },
    amber: { border: "border-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-900 dark:text-amber-200", icon: "text-amber-500" },
    red: { border: "border-red-500", bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-900 dark:text-red-200", icon: "text-red-500" },
  };
  const c = colors[color];
  return (
    <div className={`rounded-lg border-l-4 ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center gap-2"><Icon className={`h-4 w-4 ${c.icon}`} /><p className={`text-sm font-medium ${c.text}`}>{title}</p></div>
      <p className={`mt-1 text-sm ${c.text}`}>{msg}</p>
    </div>
  );
}

function ToastShowcase() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div><p className="text-sm font-medium">操作成功</p><p className="text-xs text-zinc-500">更改已保存</p></div>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <div><p className="text-sm font-medium">操作失败</p><p className="text-xs text-zinc-500">请检查后重试</p></div>
      </div>
    </div>
  );
}

function DialogShowcase() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">打开对话框</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认操作</DialogTitle>
          <DialogDescription>此操作不可撤销，确定要继续吗？</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <DialogTrigger asChild><Button variant="outline">取消</Button></DialogTrigger>
          <Button variant="destructive">确认删除</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmDialogShowcase() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 max-w-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
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
    </div>
  );
}

function ResultShowcase() {
  return (
    <div className="text-center py-8">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-xl font-bold">提交成功</h1>
      <p className="mt-2 text-sm text-zinc-500">我们将在 1-2 个工作日内处理您的申请。</p>
      <div className="flex justify-center gap-3 mt-6">
        <Button size="sm">返回首页</Button>
        <Button size="sm" variant="outline">查看详情</Button>
      </div>
    </div>
  );
}

function BannerShowcase() {
  return (
    <div className="w-full max-w-md rounded-lg bg-zinc-900 text-white text-center py-3 px-6 text-sm flex items-center justify-center gap-4 dark:bg-zinc-800">
      <Sparkles className="h-4 w-4" />
      <p>新功能上线！查看最新组件更新。</p>
      <button className="underline hover:text-zinc-300 text-xs">了解</button>
    </div>
  );
}

function ProgressShowcase() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <div className="flex justify-between text-sm"><span>完成进度</span><span>75%</span></div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full w-3/4 rounded-full bg-zinc-900 dark:bg-zinc-50 transition-all" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm"><span>下载</span><span>45%</span></div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full w-[45%] rounded-full bg-blue-500 transition-all" />
        </div>
      </div>
    </div>
  );
}

function ScoreBoardShowcase() {
  return (
    <div className="flex items-center gap-6 p-6 rounded-xl border max-w-sm">
      <div className="text-center">
        <span className="text-4xl font-bold">4.8</span>
        <div className="flex mt-1 text-yellow-500">{"★".repeat(5)}</div>
        <p className="text-xs text-zinc-400 mt-1">1,234 条评价</p>
      </div>
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map(n => (
          <div key={n} className="flex items-center gap-2 text-sm">
            <span className="w-3">{n}</span>
            <span className="text-yellow-500">★</span>
            <div className="flex-1 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: `${[70, 20, 5, 3, 2][5 - n]}%` }} />
            </div>
            <span className="text-xs text-zinc-400 w-8">{[70, 20, 5, 3, 2][5 - n]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCardShowcase() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { label: "总收入", value: "¥128,450", trend: "+12.5%", up: true },
        { label: "用户数", value: "8,420", trend: "+23.1%", up: true },
        { label: "订单量", value: "1,285", trend: "-3.2%", up: false },
        { label: "转化率", value: "4.8%", trend: "+0.8%", up: true },
      ].map((s, i) => (
        <div key={i} className="rounded-xl border p-4 dark:border-zinc-700">
          <p className="text-sm text-zinc-500">{s.label}</p>
          <p className="text-2xl font-bold mt-1">{s.value}</p>
          <p className={`flex items-center gap-1 text-xs mt-2 ${s.up ? "text-green-600" : "text-red-600"}`}>
            {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
            {s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

function TimelineShowcase() {
  const events = [
    { time: "09:30", title: "项目开始", desc: "团队启动会议" },
    { time: "12:00", title: "需求评审", desc: "完成需求文档审核" },
    { time: "15:00", title: "技术方案", desc: "确定技术架构方案" },
    { time: "18:00", title: "代码提交", desc: "提交初始代码" },
  ];
  return (
    <ol className="relative border-l-2 border-zinc-200 dark:border-zinc-700 ml-3 space-y-5">
      {events.map((e, i) => (
        <li key={i} className="ml-6">
          <span className={`absolute -left-[7px] mt-1 h-3 w-3 rounded-full border-2 ${i === 0 ? "border-zinc-900 bg-white dark:border-zinc-50 dark:bg-zinc-950" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950"}`} />
          <time className="text-xs text-zinc-400">{e.time}</time>
          <h3 className="text-sm font-medium mt-0.5">{e.title}</h3>
          <p className="text-sm text-zinc-500">{e.desc}</p>
        </li>
      ))}
    </ol>
  );
}

function CarouselShowcase() {
  const [current, setCurrent] = React.useState(0);
  const slides = [
    { color: "bg-blue-100 dark:bg-blue-900/30", text: "Slide 1" },
    { color: "bg-green-100 dark:bg-green-900/30", text: "Slide 2" },
    { color: "bg-purple-100 dark:bg-purple-900/30", text: "Slide 3" },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl w-full max-w-sm">
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className={`w-full flex-shrink-0 h-40 ${s.color} flex items-center justify-center text-lg font-semibold`}>{s.text}</div>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => <button key={i} className={`h-2 w-2 rounded-full ${i === current ? "bg-white" : "bg-white/50"}`} onClick={() => setCurrent(i)} />)}
      </div>
    </div>
  );
}

function StarRatingShowcase() {
  const [rating, setRating] = React.useState(4);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} className="text-2xl hover:scale-110 transition-transform" onClick={() => setRating(i)} aria-label={`${i}星`}>
          {i <= rating ? "⭐" : "☆"}
        </button>
      ))}
      <span className="ml-2 text-sm text-zinc-500">{rating}/5</span>
    </div>
  );
}

function SliderShowcase() {
  const [val, setVal] = React.useState(60);
  return (
    <div className="space-y-2 w-full max-w-sm">
      <div className="flex justify-between text-sm"><span>音量</span><span>{val}%</span></div>
      <input type="range" className="w-full h-2 rounded-full appearance-none bg-zinc-200 dark:bg-zinc-700 accent-zinc-900 dark:accent-zinc-50" value={val} onChange={e => setVal(Number(e.target.value))} min={0} max={100} />
    </div>
  );
}

function SwitchGroupShowcase() {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium mb-2">通知设置</legend>
      <div className="flex items-center justify-between gap-8"><label className="text-sm">邮件通知</label><Switch /></div>
      <div className="flex items-center justify-between gap-8"><label className="text-sm">推送通知</label><Switch defaultChecked /></div>
      <div className="flex items-center justify-between gap-8"><label className="text-sm">短信通知</label><Switch /></div>
    </fieldset>
  );
}

function TagInputShowcase() {
  const [tags, setTags] = React.useState(["React", "TypeScript"]);
  const [input, setInput] = React.useState("");
  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border p-2 w-full max-w-sm">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
          {tag}
          <button onClick={() => removeTag(tag)} aria-label={`删除 ${tag}`} className="hover:text-red-500">&times;</button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[80px] border-0 bg-transparent focus:outline-none text-sm"
        placeholder="添加..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") addTag(); }}
      />
    </div>
  );
}

function DatePickerShowcase() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="inline-flex flex-col rounded-lg border p-4 dark:border-zinc-700">
      <div className="flex justify-between items-center mb-3">
        <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">‹</button>
        <span className="text-sm font-medium">2026年5月</span>
        <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["一", "二", "三", "四", "五", "六", "日"].map(d => <span key={d} className="text-xs text-zinc-400 py-1">{d}</span>)}
        {days.map(d => (
          <button key={d} className={`h-9 w-9 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${d === 13 ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" : ""}`}>{d}</button>
        ))}
      </div>
    </div>
  );
}

function OtpInputShowcase() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input key={i} className="h-12 w-10 rounded-lg border border-zinc-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50" maxLength={1} defaultValue={i === 0 ? "8" : ""} />
      ))}
    </div>
  );
}

function BottomSheetShowcase() {
  return (
    <div className="rounded-t-2xl border bg-white p-4 w-full max-w-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto w-10 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-4" />
      <h2 className="text-lg font-semibold mb-2">底部面板</h2>
      <p className="text-sm text-zinc-500 mb-4">从底部弹出的操作面板，常用于移动端。</p>
      <div className="space-y-1">
        {["编辑", "分享", "复制链接", "举报"].map(a => (
          <button key={a} className="w-full py-3 text-center text-sm hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-800">{a}</button>
        ))}
      </div>
    </div>
  );
}

function ActionSheetShowcase() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl bg-white overflow-hidden mb-3 divide-y border dark:border-zinc-700 dark:bg-zinc-900">
        {["编辑", "分享", "复制链接"].map(a => (
          <button key={a} className="w-full py-4 text-center text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800">{a}</button>
        ))}
      </div>
      <button className="w-full rounded-2xl bg-white py-4 text-center text-sm font-semibold border dark:border-zinc-700 dark:bg-zinc-900">取消</button>
    </div>
  );
}

function FabShowcase() {
  return (
    <div className="flex items-center gap-4">
      <button className="h-14 w-14 rounded-full bg-zinc-900 text-white shadow-xl flex items-center justify-center dark:bg-white dark:text-zinc-900">
        <Plus className="h-6 w-6" />
      </button>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-white shadow-lg px-4 py-2.5 text-sm border dark:border-zinc-700 dark:bg-zinc-900">编辑</span>
        <span className="rounded-full bg-white shadow-lg px-4 py-2.5 text-sm border dark:border-zinc-700 dark:bg-zinc-900">分享</span>
      </div>
    </div>
  );
}

function BottomNavShowcase() {
  const items = [
    { icon: Home, label: "首页", active: true },
    { icon: Search, label: "搜索", active: false },
    { icon: Plus, label: "发布", active: false },
    { icon: Bell, label: "通知", active: false, badge: "3" },
    { icon: User, label: "我的", active: false },
  ];
  return (
    <div className="flex justify-around items-center w-full max-w-sm h-16 border rounded-t-xl bg-white dark:border-zinc-700 dark:bg-zinc-900">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 relative">
          <item.icon className={`h-6 w-6 ${item.active ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"}`} />
          <span className={`text-[10px] ${item.active ? "font-medium" : "text-zinc-400"}`}>{item.label}</span>
          {"badge" in item && <span className="absolute -top-1 -right-3 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">{item.badge}</span>}
        </div>
      ))}
    </div>
  );
}

// ============ APP-LEVEL COMPONENTS ============

function BottomTabNavShowcase() {
  const tabs = [
    { icon: Home, label: "首页", active: true },
    { icon: BarChart3, label: "账单", active: false },
    { icon: Plus, label: "记账", active: false },
    { icon: Bell, label: "提醒", active: false },
    { icon: User, label: "我的", active: false },
  ];
  return (
    <div className="flex justify-around items-center w-full h-16 bg-white border-t dark:bg-zinc-900 dark:border-zinc-700 rounded-t-xl">
      {tabs.map((t, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <t.icon className={`h-5 w-5 ${t.active ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"}`} />
          <span className={`text-[10px] ${t.active ? "font-semibold text-zinc-900 dark:text-zinc-50" : "text-zinc-400"}`}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function DataCardShowcase() {
  return (
    <div className="grid gap-3 w-full" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
      {[
        { label: "今日支出", value: "¥128.50", color: "text-red-500", icon: TrendingUp },
        { label: "本月收入", value: "¥12,450", color: "text-green-500", icon: TrendingUp },
        { label: "账户余额", value: "¥8,320", color: "text-blue-500", icon: CreditCard },
      ].map((d, i) => (
        <div key={i} className="rounded-xl border bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">{d.label}</span>
            <d.icon className={`h-4 w-4 ${d.color}`} />
          </div>
          <p className={`text-lg font-bold ${d.color}`}>{d.value}</p>
        </div>
      ))}
    </div>
  );
}

function ContentBlockShowcase() {
  return (
    <div className="w-full rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-800/30 p-6 text-center">
      <div className="text-3xl mb-2">📦</div>
      <p className="text-sm font-medium text-zinc-500">内容区域</p>
      <p className="text-xs text-zinc-400 mt-1">可放置自定义内容</p>
    </div>
  );
}

function SettingsListShowcase() {
  const items = [
    { icon: User, label: "个人资料", desc: "修改头像和昵称", arrow: true },
    { icon: Bell, label: "通知设置", desc: "管理通知偏好", arrow: true },
    { icon: Lock, label: "隐私安全", desc: "密码和隐私设置", arrow: true },
    { icon: Palette, label: "主题风格", desc: "浅色", arrow: true },
  ];
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 overflow-hidden divide-y dark:divide-zinc-700">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <item.icon className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-zinc-500">{item.desc}</p>
          </div>
          {item.arrow && <ChevronRight className="h-4 w-4 text-zinc-400" />}
        </div>
      ))}
    </div>
  );
}

function CalendarViewShowcase() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const marked = [5, 13, 20, 25];
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight className="h-4 w-4 rotate-180" /></button>
        <span className="text-sm font-semibold">2026年 5月</span>
        <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["一","二","三","四","五","六","日"].map(d => <span key={d} className="text-[10px] text-zinc-400 py-1">{d}</span>)}
        {days.map(d => (
          <button key={d} className={`h-9 w-full text-xs rounded-lg transition-colors
            ${d === 13 ? "bg-blue-500 text-white" : marked.includes(d) ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormGroupShowcase() {
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">金额</label>
        <Input placeholder="0.00" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">分类</label>
        <Select>
          <SelectTrigger><SelectValue placeholder="选择分类" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="food">餐饮</SelectItem>
            <SelectItem value="transport">交通</SelectItem>
            <SelectItem value="shop">购物</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">备注</label>
        <Input placeholder="添加备注..." />
      </div>
      <Button className="w-full">保存记录</Button>
    </div>
  );
}

function TransactionItemShowcase() {
  const items = [
    { icon: "🍔", label: "午餐", time: "12:30", amount: "-¥38.00", type: "expense" },
    { icon: "🚌", label: "地铁", time: "08:15", amount: "-¥6.00", type: "expense" },
    { icon: "💰", label: "工资", time: "昨天", amount: "+¥15,000", type: "income" },
    { icon: "🛒", label: "超市", time: "昨天", amount: "-¥156.30", type: "expense" },
  ];
  return (
    <div className="w-full divide-y dark:divide-zinc-700">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-lg">{item.icon}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-[11px] text-zinc-500">{item.time}</p>
          </div>
          <p className={`text-sm font-semibold ${item.type === "income" ? "text-green-500" : "text-zinc-900 dark:text-zinc-50"}`}>{item.amount}</p>
        </div>
      ))}
    </div>
  );
}

function ChartPlaceholderShowcase() {
  return (
    <div className="w-full rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-800/30 p-6">
      <p className="text-sm font-medium text-zinc-500 mb-4">📊 月度统计图表</p>
      <div className="flex items-end justify-between gap-2 h-24">
        {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 80].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-300 dark:bg-zinc-600 rounded-t transition-all" style={{ height: `${h}%` }} />
            <span className="text-[9px] text-zinc-400">{i + 1}月</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-3">
        <span className="flex items-center gap-1 text-[10px] text-zinc-500"><span className="h-2 w-2 rounded-full bg-blue-500" /> 收入</span>
        <span className="flex items-center gap-1 text-[10px] text-zinc-500"><span className="h-2 w-2 rounded-full bg-red-400" /> 支出</span>
      </div>
    </div>
  );
}

function SearchBarShowcase() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
      <Input className="pl-9 h-10 rounded-full bg-zinc-100 border-0 dark:bg-zinc-800" placeholder="搜索交易记录..." />
    </div>
  );
}

function PageHeaderShowcase() {
  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex items-center gap-3">
        <button className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight className="h-5 w-5 rotate-180" /></button>
        <h1 className="text-lg font-bold">记账本</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Search className="h-4 w-4" /></button>
        <button className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Settings className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function StatRowShowcase() {
  return (
    <div className="flex gap-3 w-full">
      {[
        { label: "支出", value: "¥1,280", color: "text-red-500" },
        { label: "收入", value: "¥3,450", color: "text-green-500" },
        { label: "结余", value: "¥2,170", color: "text-blue-500" },
      ].map((s, i) => (
        <div key={i} className="flex-1 rounded-xl border bg-white p-3 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs text-zinc-500">{s.label}</p>
          <p className={`text-base font-bold mt-1 ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function BlankSlotShowcase() {
  return (
    <div className="w-full rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50/30 dark:bg-zinc-800/20 p-8 text-center min-h-[80px] flex flex-col items-center justify-center">
      <Plus className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mb-2" />
      <p className="text-sm text-zinc-400">拖入组件或自定义内容</p>
    </div>
  );
}

function ListGroupShowcase() {
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 overflow-hidden divide-y dark:divide-zinc-700">
      {[
        { icon: "🍕", title: "餐饮", count: "12笔", amount: "¥1,280", color: "text-orange-500" },
        { icon: "🚌", title: "交通", count: "8笔", amount: "¥320", color: "text-blue-500" },
        { icon: "🛒", title: "购物", count: "5笔", amount: "¥890", color: "text-purple-500" },
        { icon: "🎮", title: "娱乐", count: "3笔", amount: "¥450", color: "text-green-500" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer">
          <span className="text-xl">{item.icon}</span>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-[11px] text-zinc-500">{item.count}</p>
          </div>
          <p className={`text-sm font-semibold ${item.color}`}>{item.amount}</p>
        </div>
      ))}
    </div>
  );
}

// ============ SCENE: Chat / Social ============

function ChatBubbleShowcase() {
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-end"><div className="max-w-[75%] rounded-2xl rounded-br-md bg-blue-500 text-white px-4 py-2 text-sm">在吗？今天天气真好 🌞</div></div>
      <div className="flex justify-start"><div className="max-w-[75%] rounded-2xl rounded-bl-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-sm">是啊，要不要出去走走？</div></div>
      <div className="flex justify-end"><div className="max-w-[75%] rounded-2xl rounded-br-md bg-blue-500 text-white px-4 py-2 text-sm">好啊，下午3点老地方见 👋</div></div>
    </div>
  );
}

function ChatInputShowcase() {
  return (
    <div className="flex items-center gap-2 w-full bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-700 p-2">
      <button className="shrink-0 rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xl">😊</button>
      <input className="flex-1 border-0 bg-transparent text-sm focus:outline-none dark:text-zinc-50" placeholder="输入消息..." />
      <button className="shrink-0 rounded-full bg-blue-500 text-white px-4 py-1.5 text-sm font-medium">发送</button>
    </div>
  );
}

function UserInfoShowcase() {
  return (
    <div className="flex items-center gap-3 w-full p-3 rounded-xl bg-white dark:bg-zinc-900 border dark:border-zinc-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-lg font-bold">我</div>
      <div className="flex-1">
        <p className="text-sm font-semibold">用户昵称</p>
        <p className="text-xs text-zinc-500">ID: 12345678 · 关注 128 · 粉丝 3.2K</p>
      </div>
      <Button size="sm" variant="outline" className="h-7 text-xs">关注</Button>
    </div>
  );
}

function ContactListShowcase() {
  return (
    <div className="w-full divide-y dark:divide-zinc-700">
      {[
        { name: "张三", msg: "好的，我马上到", time: "12:30", unread: 3, online: true },
        { name: "李四", msg: "文件已发送", time: "昨天", unread: 0, online: false },
        { name: "项目群", msg: "@所有人 开会了", time: "周一", unread: 99, online: true },
      ].map((c, i) => (
        <div key={i} className="flex items-center gap-3 py-3 px-1">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-sm font-medium">{c.name[0]}</div>
            {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-900 bg-green-500" />}
          </div>
          <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{c.name}</p><p className="text-xs text-zinc-500 truncate">{c.msg}</p></div>
          <div className="text-right"><p className="text-[10px] text-zinc-400">{c.time}</p>{c.unread > 0 && <Badge variant="destructive" className="text-[9px] mt-0.5">{c.unread}</Badge>}</div>
        </div>
      ))}
    </div>
  );
}

// ============ SCENE: E-commerce ============

function ProductCardShowcase() {
  return (
    <div className="w-full sm:w-44 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="h-28 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-4xl">📦</div>
      <div className="p-3">
        <p className="text-sm font-medium truncate">商品名称示例</p>
        <div className="flex items-center justify-between mt-2">
          <div><span className="text-red-500 font-bold text-sm">¥99.00</span><span className="text-[10px] text-zinc-400 line-through ml-1">¥199</span></div>
          <Badge variant="destructive" className="text-[9px]">热卖</Badge>
        </div>
      </div>
    </div>
  );
}

function OrderSummaryShowcase() {
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-3">
      <p className="text-sm font-semibold">订单 #20260513001</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-zinc-500">商品总额</span><span>¥199.00</span></div>
        <div className="flex justify-between"><span className="text-zinc-500">运费</span><span className="text-green-500">免运费</span></div>
        <div className="flex justify-between"><span className="text-zinc-500">优惠</span><span className="text-red-500">-¥30.00</span></div>
        <Separator />
        <div className="flex justify-between font-bold"><span>实付</span><span className="text-red-500">¥169.00</span></div>
      </div>
    </div>
  );
}

function PriceTagShowcase() {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[10px] text-red-500">¥</span>
      <span className="text-2xl font-bold text-red-500">99</span>
      <span className="text-xs text-red-500">.00</span>
      <span className="text-xs text-zinc-400 line-through ml-2">¥199.00</span>
    </div>
  );
}

function ReviewCardShowcase() {
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">用</div>
        <span className="text-sm font-medium">用户名</span>
        <span className="text-yellow-500 text-xs">⭐⭐⭐⭐⭐</span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">很好用，物流很快，包装也很完整，五星好评！</p>
      <div className="flex gap-2 mt-2 text-[10px] text-zinc-400"><span>2026-05-10</span><span>颜色: 黑色</span></div>
    </div>
  );
}

function CartItemShowcase() {
  return (
    <div className="flex items-center gap-3 w-full p-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
      <div className="h-16 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-2xl flex-shrink-0">📦</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">商品名称</p>
        <p className="text-xs text-zinc-500">规格: 标准版</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-red-500">¥99.00</span>
          <div className="flex items-center gap-2">
            <button className="h-6 w-6 rounded border text-xs dark:border-zinc-700">−</button>
            <span className="text-sm w-6 text-center">1</span>
            <button className="h-6 w-6 rounded border text-xs dark:border-zinc-700">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SCENE: Media / Health ============

function MusicPlayerShowcase() {
  return (
    <div className="w-full rounded-xl bg-zinc-900 text-white p-4">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-lg bg-zinc-700 flex items-center justify-center text-2xl flex-shrink-0">🎵</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">歌曲名称</p>
          <p className="text-xs text-zinc-400 truncate">歌手 · 专辑名</p>
        </div>
        <Heart className="h-5 w-5 text-zinc-400 hover:text-red-500 flex-shrink-0" />
      </div>
      <div className="mt-3">
        <div className="h-1.5 w-full rounded-full bg-zinc-700"><div className="h-full w-[40%] rounded-full bg-white" /></div>
        <div className="flex justify-between text-[10px] text-zinc-400 mt-1"><span>1:28</span><span>3:42</span></div>
      </div>
      <div className="flex justify-center items-center gap-6 mt-2 text-white">
        <button className="text-lg">⏮</button>
        <button className="h-10 w-10 rounded-full bg-white text-zinc-900 flex items-center justify-center text-lg">▶</button>
        <button className="text-lg">⏭</button>
      </div>
    </div>
  );
}

function PlaylistCardShowcase() {
  return (
    <div className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-lg flex-shrink-0">🎶</div>
      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">热门歌单推荐</p><p className="text-xs text-zinc-500 truncate">120首 · 328万次播放</p></div>
      <ChevronRight className="h-4 w-4 text-zinc-400 flex-shrink-0" />
    </div>
  );
}

function StepsCardShowcase() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white p-5">
      <p className="text-sm opacity-90">今日步数</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-4xl font-bold">8,420</p>
        <p className="text-sm opacity-80">目标 10,000</p>
      </div>
      <div className="h-2 w-full rounded-full bg-white/30 mt-3"><div className="h-full w-[84%] rounded-full bg-white" /></div>
      <div className="flex justify-between text-xs mt-2 opacity-80"><span>🔥 320 千卡</span><span>🕐 1.8 公里</span><span>⏱ 42 分钟</span></div>
    </div>
  );
}

function CheckInShowcase() {
  const days = Array.from({ length: 7 }, (_, i) => ({ day: i + 1, checked: i < 5 }));
  return (
    <div className="w-full rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <div><p className="text-sm font-semibold">每日签到</p><p className="text-xs text-zinc-500">已连续签到 5 天</p></div>
        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg">🎁</div>
      </div>
      <div className="flex justify-between gap-1">
        {days.map((d, i) => (
          <div key={i} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs ${d.checked ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600" : "text-zinc-300"}`}>
            <span>{d.checked ? "✅" : "○"}</span>
            <span>D{d.day}</span>
          </div>
        ))}
      </div>
      <Button size="sm" className="w-full mt-3 text-xs h-8">签到领积分</Button>
    </div>
  );
}

// ============ OVERLAY COMPONENTS ============

function CornerBadgeShowcase() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative inline-flex">
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">3</span>
        <span className="text-[10px] text-zinc-400">数字角标</span>
      </div>
      <div className="relative inline-flex">
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900" />
        <span className="text-[10px] text-zinc-400">圆点角标</span>
      </div>
      <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white">HOT</span>
      <span className="inline-flex items-center rounded-full bg-blue-500 px-2 py-0.5 text-[9px] font-bold text-white">NEW</span>
    </div>
  );
}

function OverlayIconShowcase() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow border dark:border-zinc-700">
        <Heart className="h-4 w-4 text-red-500" />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow border dark:border-zinc-700">
        <Star className="h-4 w-4 text-yellow-500" />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow border dark:border-zinc-700">
        <Bell className="h-4 w-4 text-blue-500" />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow border dark:border-zinc-700">
        <Settings className="h-4 w-4 text-zinc-500" />
      </div>
    </div>
  );
}

function TextLabelShowcase() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur px-2.5 py-1 text-[10px] font-medium shadow border dark:border-zinc-700">推荐</span>
      <span className="inline-flex rounded-full bg-green-500/90 text-white px-2.5 py-1 text-[10px] font-medium">已认证</span>
      <span className="inline-flex rounded-full bg-amber-500/90 text-white px-2.5 py-1 text-[10px] font-medium">限时</span>
    </div>
  );
}

function OverlayButtonShowcase() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" className="h-7 text-[10px] rounded-full shadow-lg">立即购买</Button>
      <Button size="sm" variant="secondary" className="h-7 text-[10px] rounded-full shadow-lg bg-white/90 dark:bg-zinc-800/90">查看详情</Button>
    </div>
  );
}

// ============ SCENE: General ============

function FeatureGridShowcase() {
  const items = [
    { icon: "💰", label: "记账" }, { icon: "📊", label: "统计" },
    { icon: "🎯", label: "预算" }, { icon: "💳", label: "账户" },
    { icon: "📝", label: "账单" }, { icon: "⚙️", label: "设置" },
    { icon: "📈", label: "报表" }, { icon: "🔔", label: "提醒" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {items.map((item, i) => (
        <button key={i} className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-2xl">{item.icon}</div>
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function TagFilterShowcase() {
  const tags = ["全部", "餐饮", "交通", "购物", "娱乐", "旅行", "医疗", "教育"];
  const [active, setActive] = React.useState(0);
  return (
    <div className="flex gap-2 overflow-x-auto w-full pb-1">
      {tags.map((t, i) => (
        <button key={i} onClick={() => setActive(i)}
          className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors",
            i === active ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700")}>
          {t}
        </button>
      ))}
    </div>
  );
}

function AnnouncementShowcase() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-900 p-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">📢</span>
        <div>
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">系统公告</p>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">新版本 v2.5.0 已上线，点击查看更新内容 →</p>
        </div>
      </div>
    </div>
  );
}

function ProgressRingShowcase() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="#e5e5e5" strokeWidth="8" />
          <circle cx="36" cy="36" r="30" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray="188.5" strokeDashoffset={188.5 * 0.25} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">75%</span>
      </div>
      <div>
        <p className="text-sm font-semibold">月度预算</p>
        <p className="text-xs text-zinc-500">已用 ¥7,500 / ¥10,000</p>
        <p className="text-xs text-green-500 mt-1">剩余 ¥2,500</p>
      </div>
    </div>
  );
}

function GenericShowcase({ name, variants }: { name: string; variants: string[] }) {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium dark:border-zinc-700">
        {name}
      </div>
      {variants.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {variants.map(v => (
            <Badge key={v} variant="outline" className="text-xs">{v}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
