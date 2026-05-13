import { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Mail,
  ShoppingCart,
  User,
  FileText,
  Image,
  BarChart3,
  MessageSquare,
  Calendar,
  Search,
  Lock,
  CreditCard,
  MapPin,
  Music,
  Bell,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "页面模板 | UI Reference Hub",
  description: "15+ 完整页面模板，提供桌面端和移动端的页面级设计参考",
};

const templates = [
  {
    name: "仪表盘 Dashboard",
    description: "数据分析仪表盘，包含统计卡片、图表、最近活动等模块",
    icon: LayoutDashboard,
    category: "数据分析",
    platform: ["desktop", "tablet"] as const,
    tags: ["仪表盘", "数据", "统计"],
    preview: "统计卡片 / 图表 / 活动日志 / 快捷操作",
  },
  {
    name: "设置页面 Settings",
    description: "用户设置页面，包含导航、表单、开关等设置项",
    icon: Settings,
    category: "用户管理",
    platform: ["desktop", "mobile"] as const,
    tags: ["设置", "配置", "账户"],
    preview: "侧边导航 / 分组设置 / 保存操作",
  },
  {
    name: "邮件收件箱 Inbox",
    description: "邮件列表和详情，左右分栏布局",
    icon: Mail,
    category: "通讯",
    platform: ["desktop"] as const,
    tags: ["邮件", "列表", "详情"],
    preview: "邮件列表 / 邮件详情 / 搜索筛选 / 工具栏",
  },
  {
    name: "电商商品页 Product",
    description: "电商商品详情页，包含图片画廊、规格选择和购买按钮",
    icon: ShoppingCart,
    category: "电商",
    platform: ["desktop", "mobile"] as const,
    tags: ["电商", "商品", "详情"],
    preview: "图片轮播 / 规格选择 / 价格展示 / 购物车",
  },
  {
    name: "用户资料页 Profile",
    description: "用户个人资料页面，展示用户信息和内容列表",
    icon: User,
    category: "社交",
    platform: ["desktop", "mobile"] as const,
    tags: ["个人资料", "用户", "社交"],
    preview: "头像 / 统计数据 / 个人简介 / 内容列表",
  },
  {
    name: "博客文章页 Blog",
    description: "博客文章详情，包含富文本内容和侧边栏",
    icon: FileText,
    category: "内容",
    platform: ["desktop", "mobile", "tablet"] as const,
    tags: ["博客", "文章", "内容"],
    preview: "文章内容 / 目录导航 / 相关推荐 / 评论区",
  },
  {
    name: "图片画廊 Gallery",
    description: "图片画廊页，支持网格布局和灯箱查看",
    icon: Image,
    category: "媒体",
    platform: ["desktop", "mobile"] as const,
    tags: ["图片", "画廊", "瀑布流"],
    preview: "瀑布流布局 / 灯箱预览 / 筛选标签 / 上传按钮",
  },
  {
    name: "数据报表 Report",
    description: "数据报表页面，包含多种图表和筛选条件",
    icon: BarChart3,
    category: "数据分析",
    platform: ["desktop"] as const,
    tags: ["报表", "图表", "数据"],
    preview: "柱状图 / 折线图 / 饼图 / 数据表格 / 时间筛选",
  },
  {
    name: "聊天界面 Chat",
    description: "即时通讯界面，包含消息列表和聊天窗口",
    icon: MessageSquare,
    category: "通讯",
    platform: ["desktop", "mobile"] as const,
    tags: ["聊天", "消息", "通讯"],
    preview: "会话列表 / 消息气泡 / 输入框 / 表情选择",
  },
  {
    name: "日历日程 Calendar",
    description: "日历日程页面，支持月/周/日视图",
    icon: Calendar,
    category: "效率工具",
    platform: ["desktop", "mobile"] as const,
    tags: ["日历", "日程", "事件"],
    preview: "月视图日历 / 事件弹窗 / 日程列表 / 视图切换",
  },
  {
    name: "搜索结果 Search Results",
    description: "搜索结果展示页，支持筛选和分页",
    icon: Search,
    category: "导航",
    platform: ["desktop", "mobile"] as const,
    tags: ["搜索", "结果", "筛选"],
    preview: "搜索栏 / 结果列表 / 分类筛选 / 分页器",
  },
  {
    name: "登录注册 Login",
    description: "登录注册页面，包含表单和社交登录",
    icon: Lock,
    category: "认证",
    platform: ["desktop", "mobile"] as const,
    tags: ["登录", "注册", "认证"],
    preview: "表单输入 / 社交登录 / 密码找回 / 验证码",
  },
  {
    name: "结账支付 Checkout",
    description: "电商结账页面，多步骤订单流程",
    icon: CreditCard,
    category: "电商",
    platform: ["desktop", "mobile"] as const,
    tags: ["结账", "支付", "订单"],
    preview: "进度步骤 / 地址表单 / 支付选择 / 订单摘要",
  },
  {
    name: "地图定位 Map",
    description: "地图定位页面，展示标记和信息窗",
    icon: MapPin,
    category: "位置服务",
    platform: ["desktop", "mobile"] as const,
    tags: ["地图", "定位", "标记"],
    preview: "地图视图 / 搜索地点 / 标记点 / 信息卡片",
  },
  {
    name: "通知中心 Notifications",
    description: "通知列表页面，展示系统通知和提醒",
    icon: Bell,
    category: "系统",
    platform: ["desktop", "mobile"] as const,
    tags: ["通知", "提醒", "消息"],
    preview: "通知列表 / 未读标记 / 时间分组 / 操作按钮",
  },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">页面模板</h1>
        <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
          15+ 完整页面模板，覆盖仪表盘、设置、电商、社交等常见场景。提供参与级设计参考，而非单一组件。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => (
          <Card key={tpl.name} className="group transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600">
            <CardContent className="p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                <tpl.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
              </div>
              <h3 className="font-semibold">{tpl.name}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {tpl.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tpl.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px]">{tag}</Badge>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">包含模块：</span>
                  {tpl.preview}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
