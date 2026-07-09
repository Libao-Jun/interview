import {
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "./seo";

// ============================================================
// 首页 SEO 元数据
// ============================================================

export const homeMetadata: Metadata = {
  title: {
    absolute: siteConfig.homeTitle,
  },
  description: siteConfig.homeDescription,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.homeDescription,
    type: "website",
    images: ["/ogp.png"],
    url: siteConfig.url,
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.homeDescription,
  },
};

// ============================================================
// 分享元数据  OpenGraph（OG）元数据协议
// ============================================================
export const homeOgp: Metadata = {
  openGraph: {
    title: siteConfig.name,
    type: "website",
    images: ["/ogp.png"],
    description: siteConfig.homeDescription,
    url: siteConfig.url,
  },
}

// ============================================================
// 首页「热门话题」分区
// ============================================================

export interface HomeTrack {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  tone: string;
}

export const homeTracks: HomeTrack[] = [
  {
    title: "基础知识",
    href: "/docs/fundamentals",
    description: "HTML/CSS、JavaScript/TypeScript、浏览器渲染与网络链路。",
    icon: BrainCircuit,
    tone: "from-amber-100 via-white to-amber-50",
  },
  {
    title: "工程化与场景题",
    href: "/docs/engineering",
    description: "性能优化、构建链路、发布交付与项目架构题的组织方式。",
    icon: BriefcaseBusiness,
    tone: "from-emerald-100 via-white to-lime-50",
  },
];

// ============================================================
// 首页「资料沉淀」分区
// ============================================================

export const homeRoutines: string[] = [
  `先按专题建立知识地图，再逐步补充“原理 -> 场景 -> 取舍”的回答骨架。`,
  "每篇文档都只保留可复述的结论、关键词和典型追问，避免堆原文摘抄。",
  "优先准备最近项目相关场景题，把知识点和真实案例绑定在一起。",
];

// ============================================================
// 首页「按角色切入」分区
// ============================================================

export interface HomeRolePath {
  title: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  focus: string[];
}

export const homeRolePaths: HomeRolePath[] = [
  {
    title: "初级前端",
    href: "/docs/fundamentals",
    icon: GraduationCap,
    accent: "bg-amber-100 text-amber-800",
    description: "先把浏览器、JavaScript、CSS 和网络链路补到能稳定输出的水平。",
    focus: ["HTML/CSS", "JavaScript / TypeScript", "浏览器与网络"],
  },
  {
    title: "中级前端",
    href: "/docs/frameworks",
    icon: Layers3,
    accent: "bg-sky-100 text-sky-800",
    description: "重点准备 Vue / React 的渲染更新、状态流和常见项目场景。",
    focus: ["Vue 专题", "React 专题", "刷题策略"],
  },
  {
    title: "高级前端",
    href: "/docs/engineering/performance",
    icon: Rocket,
    accent: "bg-emerald-100 text-emerald-800",
    description:
      `把性能、架构和复杂场景题讲成“问题、方案、取舍、结果”的完整链路。`,
    focus: [
      "前端工程化（构建/依赖/环境）",
      "前端模块化",
      "性能优化（首屏/运行时/资源）",
      "项目架构",
      "真实案例复盘",
    ],
  },
  {
    title: "专家前端",
    href: "/docs/engineering/architecture",
    icon: Wrench,
    accent: "bg-rose-100 text-rose-800",
    description:
      "能跨团队、跨项目解决系统性问题，主导技术演进，对稳定性、效率、质量、成本负责。",
    focus: [
      "前端架构设计与演进",
      "性能与稳定性SLA",
      "工程治理（代码/依赖/构建/部署）",
      "跨团队协作与技术推动",
      "技术债务与演进策略",
      "面试与团队赋能",
    ],
  },
];
