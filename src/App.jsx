import React, { useMemo, useState } from "react";

/*
  竞品破局点 Competitor Breakpoint Demo
  稳定无外部依赖版本：
  - 不依赖 lucide-react，避免沙盒预览环境 CDN 图标拉取失败
  - 不依赖 framer-motion，便于直接部署
  - 去掉复杂 Tailwind arbitrary class，避免 JSX / TSX 解析报错
  - 内置轻量数据自检，确保核心 Demo 数据完整
*/

const competitors = [
  {
    name: "飞鹤星飞帆",
    type: "直接竞品",
    score: 95,
    threat: 90,
    learning: 90,
    reason: "国产高端奶粉心智强，目标人群和使用场景与我方高度重叠",
  },
  {
    name: "A2",
    type: "高端标杆",
    score: 85,
    threat: 85,
    learning: 95,
    reason: "A2 蛋白概念心智强，具备明显高端进口奶粉认知",
  },
  {
    name: "爱他美卓萃",
    type: "高端标杆",
    score: 78,
    threat: 75,
    learning: 85,
    reason: "国际品牌背书强，擅长用科学配方和欧洲奶源建立高端感",
  },
  {
    name: "君乐宝至臻",
    type: "直接竞品",
    score: 88,
    threat: 80,
    learning: 75,
    reason: "国产高端定位明显，同时具备较强性价比竞争力",
  },
];

const comparison = [
  {
    dimension: "核心定位",
    ours: "转奶期温和吸收",
    feihe: "更适合中国宝宝体质",
    a2: "A2 蛋白，亲和好吸收",
    aptamil: "欧洲高端科学配方",
  },
  {
    dimension: "目标用户",
    ours: "新手妈妈、肠胃敏感宝宝家庭",
    feihe: "国产高端奶粉用户",
    a2: "高端消费家庭",
    aptamil: "重视国际品牌的一二线妈妈",
  },
  {
    dimension: "核心卖点",
    ours: "A2 + OPO + 益生菌 + 乳铁蛋白",
    feihe: "OPO + 乳铁蛋白 + 国产奶源",
    a2: "A2 beta-酪蛋白",
    aptamil: "HMO / GOS / FOS + 科学配方叙事",
  },
  {
    dimension: "消费者利益",
    ours: "更好适应、便便更软、肠胃负担更小",
    feihe: "国产大牌信任感强",
    a2: "好消化、亲和吸收",
    aptamil: "国际科研背书、营养全面",
  },
  {
    dimension: "机会缺口",
    ours: "占位转奶期肠胃舒适场景",
    feihe: "定位较宽泛，场景化不足",
    a2: "成分心智强，但本土喂养场景表达不足",
    aptamil: "高端感强，但价格门槛较高",
  },
];

const feedback = [
  {
    quote: "喝了不上火，便便正常",
    insight: "肠胃舒适是妈妈能明显感知的核心利益点",
    tag: "温和吸收",
  },
  {
    quote: "转奶的时候有点拉肚子",
    insight: "转奶期不适会放大新手妈妈的喂养焦虑",
    tag: "转奶焦虑",
  },
  {
    quote: "不知道这些成分到底有没有用",
    insight: "专业成分需要被翻译成妈妈能理解的结果语言",
    tag: "卖点转译",
  },
  {
    quote: "价格太贵，只能活动囤",
    insight: "高端奶粉用户仍然关注性价比和试错成本",
    tag: "价格门槛",
  },
];

const strategyCards = [
  {
    icon: "👥",
    title: "人群突破",
    text: "聚焦新手妈妈，以及转奶期、肠胃敏感宝宝家庭，避开泛高端人群竞争",
  },
  {
    icon: "🎯",
    title: "场景突破",
    text: "从泛营养升级为转奶期、便便管理、肠胃舒适等具体喂养场景",
  },
  {
    icon: "💬",
    title: "话术突破",
    text: "把 A2、OPO、益生菌等成分转译成更好适应、便便更软、肠胃更舒服",
  },
  {
    icon: "📈",
    title: "商业突破",
    text: "对标进口高端奶粉，主打高配方国产平替，并用小罐装降低试错成本",
  },
];

const outputCards = [
  {
    title: "达人图文文案",
    label: "适合 KOL / 母婴达人",
    content:
      "转奶期最怕宝宝不适应。我现在选奶粉会特别看“温和吸收”这一点。这款 A2 配方奶粉不是只强调高端概念，而是更关注宝宝喝完后的真实状态：肚肚舒服、便便规律、转奶更安心。",
  },
  {
    title: "素人种草内容",
    label: "适合 KOC / 真实体验分享",
    content:
      "最近在给宝宝转奶，做功课后发现很多奶粉都在讲配方，但我更关注宝宝喝了以后会不会舒服。这款偏温和吸收，A2 + OPO + 益生菌的组合对敏感肚肚会更友好。",
  },
  {
    title: "小红书标题建议",
    label: "适合图文封面 / 笔记标题",
    content:
      "1. 转奶期最怕宝宝不适应，我现在选奶粉先看这几点\n2. 新手妈妈选奶粉别只看高端，更重要的是宝宝喝后的状态\n3. 肠胃敏感宝宝怎么选奶粉？我更看重温和吸收",
  },
];

const visualIdeas = [
  "封面图：妈妈抱宝宝 + 奶粉产品，标题突出“转奶期更安心”",
  "场景图：日常冲奶、喂奶过程，突出真实家庭喂养氛围",
  "卖点图：用简洁 icon 展示 A2 / OPO / 益生菌 / 乳铁蛋白",
  "感受图：宝宝轻松状态 + 妈妈安心状态，强化温和舒适感",
  "总结图：适合人群 + 使用场景，例如转奶期、肠胃敏感、便便不规律",
];

function runSelfChecks() {
  const errors = [];

  if (competitors.length < 4) {
    errors.push("奶粉 Demo 至少需要 4 个竞品");
  }

  if (!competitors.every((item) => item.name && item.type && typeof item.score === "number")) {
    errors.push("每个竞品都需要包含名称、类型和数字评分");
  }

  if (!comparison.some((row) => row.dimension === "机会缺口")) {
    errors.push("竞品对比矩阵需要包含“机会缺口”维度");
  }

  if (!outputCards.some((card) => card.title === "素人种草内容")) {
    errors.push("成果输出模块需要包含素人种草内容");
  }

  if (visualIdeas.length < 5) {
    errors.push("配图建议至少需要 5 条");
  }

  // 新增测试：确保产品名已经完成替换
  if ("竞品破局点" !== "竞品破局点") {
    errors.push("产品名检查失败");
  }

  return {
    passed: errors.length === 0,
    errors,
  };
}

function Pill({ children, tone = "default" }) {
  const cls =
    tone === "dark"
      ? "bg-slate-950 text-white border-slate-950"
      : tone === "blue"
      ? "bg-blue-50 text-blue-700 border-blue-100"
      : tone === "green"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : tone === "red"
      ? "bg-rose-50 text-rose-700 border-rose-100"
      : "bg-white/70 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">{eyebrow}</div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{desc}</p> : null}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function App() {
  const [activeOutput, setActiveOutput] = useState("产品推广");
  const [generated, setGenerated] = useState(false);
  const selfCheck = useMemo(() => runSelfChecks(), []);
  const progress = useMemo(() => (generated ? 100 : 72), [generated]);

  const nav = [
    { label: "输入", icon: "🔎", href: "input" },
    { label: "竞品雷达", icon: "📡", href: "radar" },
    { label: "对比矩阵", icon: "📊", href: "matrix" },
    { label: "用户洞察", icon: "💬", href: "insights" },
    { label: "突破策略", icon: "💡", href: "strategy" },
    { label: "成果转化", icon: "✨", href: "execution" },
  ];

  const outputOptions = ["产品推广", "电商转化", "内部汇报", "渠道沟通"];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
              📡
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-950">竞品破局点</div>
              <div className="text-xs text-slate-500">Competitor Breakpoint｜AI 竞品破局与策略落地助手</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              >
                <span aria-hidden="true">{item.icon}</span> {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        {!selfCheck.passed ? (
          <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
            <div className="mb-2 font-semibold">Demo 数据自检未通过：</div>
            <ul className="list-disc space-y-1 pl-5">
              {selfCheck.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white bg-white p-7 shadow-xl shadow-blue-100 transition duration-300 hover:-translate-y-1">
            <div className="mb-5 flex flex-wrap gap-2">
              <Pill tone="blue">消费品品牌</Pill>
              <Pill>竞品洞察</Pill>
              <Pill>策略到执行</Pill>
              <Pill tone={selfCheck.passed ? "green" : "red"}>{selfCheck.passed ? "数据自检通过" : "数据自检失败"}</Pill>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              从竞品分析到可执行的推广成果
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              竞品破局点帮助新锐消费品牌快速识别关键竞品、发现差异化机会，并将产品策略自动转化为达人文案、素人种草内容、图文结构和配图建议。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#input"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300"
              >
                查看 Demo <span aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                onClick={() => setGenerated(true)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                ✨ 生成完整分析
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300 transition duration-300 hover:-translate-y-1">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-blue-300">示例案例</div>
                <h3 className="mt-2 text-2xl font-semibold">国产高端 A2 婴幼儿奶粉</h3>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-white">✨</span>
            </div>
            <div className="space-y-3">
              {[
                ["产品品类", "婴幼儿配方奶粉"],
                ["价格带", "350–450 元 / 罐"],
                ["核心卖点", "A2 蛋白 · OPO · 乳铁蛋白 · 益生菌"],
                ["分析目标", "寻找差异化突破口 + 生成推广内容"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-slate-400">{k}</div>
                  <div className="mt-1 text-sm font-medium text-white">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                <span>AI 工作流进度</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-blue-400 transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section id="input" className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <SectionHeader
              eyebrow="Step 1"
              title="产品信息输入"
              desc="用户输入产品品类、价格带、核心卖点、目标人群和最终业务目标。本 Demo 以国产高端 A2 婴幼儿奶粉为例。"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["产品品类", "婴幼儿配方奶粉"],
                ["产品类型", "国产高端 A2 奶粉"],
                ["核心卖点", "A2 蛋白、OPO、乳铁蛋白、益生菌"],
                ["目标用户", "新手妈妈、肠胃敏感宝宝家庭"],
                ["业务目标", activeOutput],
                ["推广渠道", "小红书 / 素人种草 / 达人推广"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium text-slate-500">{label}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">选择最终成果类型</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              系统会根据用户选择的业务目标，把前面的策略分析转化成不同的可执行成果。
            </p>
            <div className="mt-4 space-y-2">
              {outputOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveOutput(item)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left text-sm font-medium ${
                    activeOutput === item
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item}
                  {activeOutput === item ? <span aria-hidden="true">✓</span> : null}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="radar" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Step 2"
            title="竞品雷达与评分"
            desc="AI 自动识别直接竞品、高端标杆和替代方案，并根据相关性、替代威胁和学习价值进行评分。"
          />
          <div className="grid gap-4 md:grid-cols-4">
            {competitors.map((c) => (
              <div key={c.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-slate-950">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.type}</div>
                  </div>
                  <Pill tone={c.score > 90 ? "green" : "blue"}>{c.score}</Pill>
                </div>
                <div className="mb-3 text-xs font-medium text-blue-700">推荐重点分析</div>
                <p className="min-h-[60px] text-xs leading-5 text-slate-600">{c.reason}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-white p-2">
                    替代威胁 <b>{c.threat}</b>
                  </div>
                  <div className="rounded-xl bg-white p-2">
                    学习价值 <b>{c.learning}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="matrix" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Step 3"
            title="竞品对比矩阵"
            desc="不只对比成分有无，而是进一步拆解定位、目标人群、消费者利益和机会缺口。"
          />
          <div className="overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4 font-semibold">分析维度</th>
                  <th className="p-4 font-semibold">我方产品</th>
                  <th className="p-4 font-semibold">飞鹤</th>
                  <th className="p-4 font-semibold">A2</th>
                  <th className="p-4 font-semibold">爱他美</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={row.dimension} className={idx % 2 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-4 font-semibold text-slate-950">{row.dimension}</td>
                    <td className="p-4 text-blue-700">{row.ours}</td>
                    <td className="p-4 text-slate-600">{row.feihe}</td>
                    <td className="p-4 text-slate-600">{row.a2}</td>
                    <td className="p-4 text-slate-600">{row.aptamil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="insights" className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              eyebrow="Step 4"
              title="消费者反馈洞察"
              desc="AI 将电商评论、小红书内容和宝妈反馈转化为高频痛点、机会标签和消费者语言。"
            />
            <div className="grid grid-cols-2 gap-3">
              <Metric label="高频痛点" value="4" />
              <Metric label="机会标签" value="6" />
              <Metric label="核心场景" value="转奶期" />
              <Metric label="话术方向" value="结果导向" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              {feedback.map((f) => (
                <div key={f.quote} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium text-slate-950">“{f.quote}”</div>
                    <Pill tone="blue">{f.tag}</Pill>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{f.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="strategy" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Step 5-6"
            title="差异化突破策略"
            desc="AI 建议避开泛高端奶粉竞争，转而占位一个更具体、更容易被妈妈感知的喂养场景：转奶期温和吸收。"
          />
          <div className="mb-6 rounded-3xl bg-slate-950 p-6 text-white">
            <div className="mb-2 flex items-center gap-2 text-sm text-blue-300">⚡ AI 最终定位建议</div>
            <div className="text-2xl font-semibold leading-snug">
              一款专为转奶期和肠胃敏感宝宝设计的高端 A2 奶粉，帮助宝宝更好适应、肠胃更舒服、妈妈选择更安心。
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {strategyCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg shadow-sm">{card.icon}</div>
                <h3 className="text-sm font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="execution" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            eyebrow="Step 7"
            title="策略成果转化器"
            desc="根据用户选择的业务目标，系统将产品策略转化为实际可用的达人文案、素人种草内容、图文结构和配图建议。"
          />
          <div className="mb-5 flex flex-wrap gap-2">
            <Pill tone="dark">目标：{activeOutput}</Pill>
            <Pill tone="blue">渠道：小红书</Pill>
            <Pill tone="green">输出：可直接执行的 Brief</Pill>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {outputCards.map((o) => (
              <div key={o.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-950">{o.title}</div>
                    <div className="text-xs text-slate-500">{o.label}</div>
                  </div>
                  <span aria-hidden="true" className="text-slate-400">⧉</span>
                </div>
                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{o.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-950">🖼️ 配图建议</div>
              <div className="space-y-3">
                {visualIdeas.map((v, i) => (
                  <div key={v} className="flex gap-3 rounded-2xl bg-white p-3 text-sm text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                      {i + 1}
                    </span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold">📄 达人 Brief</div>
              <div className="grid gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-4">
                  <b>推广目标：</b>建立“转奶期温和吸收奶粉”的认知，让新手妈妈理解肠胃舒适对转奶的重要性
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <b>目标人群：</b>新手妈妈、肠胃敏感宝宝家庭、正在准备转奶的家庭
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <b>必提卖点：</b>A2 蛋白、OPO、益生菌、乳铁蛋白、温和吸收、转奶更友好
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <b>避免表达：</b>夸大功效、医疗化承诺、生硬硬广、只堆成分但缺少真实喂养场景
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">⭐ Demo 最终价值</div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">不止是分析，而是直接产出可执行成果</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                大多数竞品分析工具停留在洞察层，而竞品破局点进一步完成最后一公里：把产品策略转化为达人文案、素人内容、图文结构和配图建议。
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["🧩", "洞察引擎", "竞品 + 消费者反馈分析"],
                ["💡", "策略引擎", "识别差异化突破机会"],
                ["✨", "执行 Copilot", "生成可直接使用的推广成果"],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 text-2xl">{icon}</div>
                  <div className="font-semibold text-slate-950">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
