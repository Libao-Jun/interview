import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Layers3,
  Rocket,
  Sparkles,
  TimerReset,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { source } from "@/lib/source";

const tracks = [
  {
    title: "基础原理",
    href: "/docs/fundamentals",
    description: "HTML/CSS、JavaScript/TypeScript、浏览器渲染与网络链路。",
    icon: BrainCircuit,
    tone: "from-amber-100 via-white to-amber-50",
  },
  {
    title: "框架专题",
    href: "/docs/frameworks",
    description: "Vue 与 React 的响应式、渲染模型、状态流和性能抓手。",
    icon: Blocks,
    tone: "from-sky-100 via-white to-cyan-50",
  },
  {
    title: "工程化与场景题",
    href: "/docs/engineering",
    description: "性能优化、构建链路、发布交付与项目架构题的组织方式。",
    icon: BriefcaseBusiness,
    tone: "from-emerald-100 via-white to-lime-50",
  },
];

const routines = [
  "先按专题建立知识地图，再逐步补充“原理 -> 场景 -> 取舍”的回答骨架。",
  "每篇文档都只保留可复述的结论、关键词和典型追问，避免堆原文摘抄。",
  "优先准备最近项目相关场景题，把知识点和真实案例绑定在一起。",
];

const rolePaths = [
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
    description: "把性能、架构和复杂场景题讲成“问题、方案、取舍、结果”的完整链路。",
    focus: ["前端工程化（构建/依赖/环境）","前端模块化","性能优化（首屏/运行时/资源）", "项目架构", "真实案例复盘"],
  },
  {
    title: "专家前端",
    href: "/docs/engineering/architecture",
    icon: Wrench,
    accent: "bg-rose-100 text-rose-800",
    description: "能跨团队、跨项目解决系统性问题，主导技术演进，对稳定性、效率、质量、成本负责。",
    focus: ["前端架构设计与演进", "性能与稳定性SLA", "工程治理（代码/依赖/构建/部署）", "跨团队协作与技术推动", "技术债务与演进策略", "面试与团队赋能"],
  },
];

const recentDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "2-digit",
  day: "2-digit",
});

function getRecentTimestamp(value?: string) {
  if (!value) return 0;

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function formatRecentDate(value?: string) {
  const timestamp = getRecentTimestamp(value);
  if (timestamp === 0) return null;

  return recentDateFormatter.format(new Date(timestamp));
}

function getRecentAdditions() {
  return source
    .getPages()
    .filter((page) => page.data.featuredOnHome)
    .sort(
      (left, right) =>
        getRecentTimestamp(right.data.updatedAt) -
        getRecentTimestamp(left.data.updatedAt),
    )
    .slice(0, 4)
    .map((page) => ({
      href: page.url,
      label: page.data.homeLabel ?? "最近补充",
      title: page.data.title,
      description: page.data.description ?? "查看这篇最近补充的章节。",
      updatedAt: formatRecentDate(page.data.updatedAt),
    }));
}

export default function HomePage() {
  const recentAdditions = getRecentAdditions();

  return (
    <main className="relative flex-1 overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(249,250,251,0.9))] dark:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden dark:block dark:[background-image:radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.92))]" />
      <div className="pointer-events-none absolute -left-10 top-16 size-40 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute right-0 top-0 size-56 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/10" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-16 pt-10 sm:px-8 lg:px-12 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-white/80 px-3 py-1 text-xs font-medium tracking-[0.24em] text-amber-700 uppercase shadow-sm backdrop-blur dark:border-amber-400/20 dark:bg-slate-900/80 dark:text-amber-200">
              Front-End Interview System
            </span>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                零散面试题和项目经验整理成的知识库
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                一套围绕基础原理、框架实战和工程化场景展开的面试路线图。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950 dark:shadow-white/10"
              >
                打开知识库
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs/guide"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800"
              >
                查看刷题策略
                <Sparkles className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/75">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  覆盖模块
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">8+</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  按专题拆分高频问题与回答框架
                </p>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/75">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  组织方式
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  原理 → 场景
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  把知识点映射到真实项目和追问链路
                </p>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/75">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  使用方式
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  周复盘
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  每周补齐盲区并沉淀自己的表达版本
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-slate-950/20">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-300">
              <TimerReset className="size-4 text-slate-400 dark:text-slate-500" />
              本周准备节奏
            </div>

            <ol className="mt-6 space-y-4">
              <li className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Day 1-2
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  补全基础原理空白
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  优先复盘渲染流程、事件循环、作用域链和网络链路。
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Day 3-4
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  绑定框架与项目经验
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  选择 Vue 或 React 相关问题，用最近项目中的优化案例作回答素材。
                </p>
              </li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Day 5
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  做一轮场景题演练
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  从性能、构建或架构中挑一个题目，完整说出方案、取舍和落地结果。
                </p>
              </li>
            </ol>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_380px]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-slate-950/20 lg:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                  Role-Based Entry
                </p>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  按入门/进阶/高级/专家切入。
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-300">
                按你当前目标岗位选择起步路线，先把最影响面试结果的内容补齐。
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {rolePaths.map((path) => {
                const Icon = path.icon;

                return (
                  <Link
                    key={path.href}
                    href={path.href}
                    className="group rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex rounded-2xl px-3 py-2 text-sm font-medium ${path.accent}`}
                      >
                        <Icon className="size-4.5" />
                      </span>
                      <ArrowRight className="mt-1 size-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
                      {path.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {path.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {path.focus.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-50 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 lg:p-7">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300 dark:text-slate-200">
              <Clock3 className="size-4" />
              最近补充章节
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300 dark:text-slate-400">
              如果你只想从最值得先看的内容开始，可以直接从这里进入。
            </p>

            <div className="mt-6 space-y-3">
              {recentAdditions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:border-slate-700 dark:hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.18em] text-slate-300 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                      {item.updatedAt ? <span>{item.updatedAt}</span> : null}
                      <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-white dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                Knowledge Tracks
              </p>
              <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
                热门话题
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-300">
              每个分区都以“章节导读 + 高频问题 +
              回答要点”的方式组织，方便快速定位和二次补充。
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {tracks.map((track) => {
              const Icon = track.icon;

              return (
                <Link
                  key={track.href}
                  href={track.href}
                  className={`group rounded-[1.75rem] border border-white/80 bg-gradient-to-br ${track.tone} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-2xl bg-white/85 p-3 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                      <Icon className="size-5" />
                    </span>
                    <ArrowRight className="size-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-slate-950 dark:text-white">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {track.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-slate-50 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-medium text-slate-300 dark:text-slate-200">
              Interview Routine
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              资料沉淀
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {routines.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200 dark:border-slate-800 dark:bg-slate-950/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
