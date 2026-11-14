import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  PieChart as PieIcon,
  Receipt,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  HERO_METRICS,
  HERO_TREND_DATA,
  SAMPLE_BUDGET_ALLOCATIONS,
  SAMPLE_SAVINGS_GOALS,
  SAMPLE_TRANSACTIONS,
} from '../data/finoraData';
import type { FeatureKey, TransactionCategory } from '../types/finance';
import { calculateProgressPercent, formatRM } from '../utils/finance';

interface FeatureMeta {
  key: FeatureKey;
  title: string;
  shortLabel: string;
  description: string;
  capabilities: string[];
  icon: typeof Receipt;
}

const FEATURES_LIST: FeatureMeta[] = [
  {
    key: 'tracking',
    title: 'Smart Expense Tracking',
    shortLabel: 'Expense Tracking',
    description: 'Keep track of your spending and understand exactly where your money goes.',
    capabilities: [
      'Record income and everyday expenses',
      'Categorize transactions across Food, Transport, Shopping, Education, and Entertainment',
      'Review recent transactions and spot major spending categories',
    ],
    icon: Receipt,
  },
  {
    key: 'budgets',
    title: 'Personal Budget Management',
    shortLabel: 'Budget Limits',
    description: 'Create realistic monthly budgets and stay within your financial limits.',
    capabilities: [
      'Set monthly budgets and allocate limits by category',
      'Monitor real-time budget utilization percentages',
      'Receive clear visual indicators when categories approach their limit',
    ],
    icon: PieIcon,
  },
  {
    key: 'savings',
    title: 'Savings Goals',
    shortLabel: 'Savings Goals',
    description: 'Turn your financial goals into achievable milestones.',
    capabilities: [
      'Create dedicated savings goals with target Ringgit amounts',
      'Track accumulated savings and percentage completion',
      'Monitor estimated timelines based on monthly contributions',
    ],
    icon: Target,
  },
  {
    key: 'insights',
    title: 'Financial Insights',
    shortLabel: 'Financial Insights',
    description: 'Discover spending patterns and understand your financial habits.',
    capabilities: [
      'Monthly spending summaries and category breakdowns',
      'Income versus expense comparisons over consecutive months',
      'Clear arithmetic trends to review savings performance',
    ],
    icon: BarChart3,
  },
  {
    key: 'overview',
    title: 'Financial Overview',
    shortLabel: 'Unified Overview',
    description: 'See your complete financial picture in one organized dashboard.',
    capabilities: [
      'Total income, total expenses, and available balance together',
      'Monthly savings goal tracking beside daily activity',
      'Recent financial activity in a single scannable view',
    ],
    icon: LayoutDashboard,
  },
];

const TX_FILTER_OPTIONS: ('All' | Exclude<TransactionCategory, 'Income' | 'Utilities'>)[] = [
  'All',
  'Food',
  'Transport',
  'Shopping',
  'Education',
  'Entertainment',
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureKey>('tracking');
  const [txFilter, setTxFilter] =
    useState<'All' | Exclude<TransactionCategory, 'Income' | 'Utilities'>>('All');

  const activeFeature =
    FEATURES_LIST.find((f) => f.key === selectedFeature) ?? FEATURES_LIST[0];

  const filteredTransactions = SAMPLE_TRANSACTIONS.filter((tx) => {
    if (tx.type === 'income') return false;
    if (txFilter === 'All') return true;
    return tx.category === txFilter;
  });

  return (
    <section
      id="features"
      className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#047857]">
            Core Capabilities
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
            Everything You Need to Understand Your Money.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            Select any capability below to inspect how Finora turns everyday numbers into a
            calm, structured product experience.
          </p>
        </div>

        {/* Mobile/Tablet Feature Selector Tabs */}
        <div
          className="mt-8 flex lg:hidden overflow-x-auto gap-2 pb-2"
          role="tablist"
          aria-label="Finora feature previews"
        >
          {FEATURES_LIST.map((item) => {
            const isSelected = item.key === selectedFeature;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedFeature(item.key)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#142B45] text-white border-[#142B45]'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:text-[#142B45]'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Desktop Split: Left Capability Menu / Right Live Product Demonstration */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation List */}
          <div className="hidden lg:flex lg:col-span-5 flex-col divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-2xl overflow-hidden bg-[#F8FAFC]">
            {FEATURES_LIST.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = item.key === selectedFeature;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelectedFeature(item.key)}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`w-full text-left p-5 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#10B981] ${
                    isSelected
                      ? 'bg-white'
                      : 'bg-[#F8FAFC] hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#142B45] text-white'
                          : 'bg-slate-200/70 text-[#475569]'
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={`text-sm font-bold ${
                            isSelected ? 'text-[#142B45]' : 'text-[#334155]'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="font-mono tabular-nums text-[11px] text-[#64748B]">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Live Product Preview Panel */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
              <div>
                <p className="text-xs font-semibold text-[#047857]">
                  Feature Preview · Illustrative Sample Data
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#142B45]">
                  {activeFeature.title}
                </h3>
                <p className="mt-1 text-sm text-[#475569]">{activeFeature.description}</p>
              </div>
            </div>

            {/* Feature-Specific Interactive UI */}
            <div className="mt-5 bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
              {selectedFeature === 'tracking' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#142B45]">
                      Filter by Category
                    </span>
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter sample transactions">
                      {TX_FILTER_OPTIONS.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setTxFilter(cat)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            txFilter === cat
                              ? 'bg-[#142B45] text-white'
                              : 'bg-slate-100 text-[#475569] hover:text-[#142B45]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-[#F1F5F9]">
                    {filteredTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="py-3 flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1E293B] truncate">
                            {tx.merchant}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            {tx.category} · {tx.date}
                          </p>
                        </div>
                        <span className="font-mono tabular-nums font-semibold text-[#142B45] shrink-0">
                          -{formatRM(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFeature === 'budgets' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Category Monthly Limits</span>
                    <span className="font-mono tabular-nums">November Allocation</span>
                  </div>
                  <div className="space-y-4">
                    {SAMPLE_BUDGET_ALLOCATIONS.map((b) => {
                      const pct = calculateProgressPercent(b.spent, b.limit);
                      const isNearLimit = pct >= 90;
                      return (
                        <div key={b.category} className="space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#142B45]">
                                {b.category}
                              </span>
                              {isNearLimit && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B45309]">
                                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                                  Near limit
                                </span>
                              )}
                            </div>
                            <span className="font-mono tabular-nums text-[#475569]">
                              {formatRM(b.spent, { decimals: 0 })} /{' '}
                              {formatRM(b.limit, { decimals: 0 })} ({pct}%)
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: isNearLimit ? '#F59E0B' : b.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedFeature === 'savings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Active Savings Milestones</span>
                    <span className="font-mono tabular-nums">3 Sample Goals</span>
                  </div>
                  <div className="divide-y divide-[#F1F5F9]">
                    {SAMPLE_SAVINGS_GOALS.map((goal) => {
                      const pct = calculateProgressPercent(goal.saved, goal.target);
                      const remaining = Math.max(0, goal.target - goal.saved);
                      return (
                        <div key={goal.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold text-[#142B45]">
                                {goal.title}
                              </h4>
                              <p className="text-xs text-[#64748B]">
                                +{formatRM(goal.monthlyContribution, { decimals: 0 })}/mo ·
                                Target {goal.targetDate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono tabular-nums text-sm font-semibold text-[#142B45]">
                                {formatRM(goal.saved, { decimals: 0 })}{' '}
                                <span className="text-xs font-normal text-[#64748B]">
                                  / {formatRM(goal.target, { decimals: 0 })}
                                </span>
                              </p>
                              <p className="font-mono tabular-nums text-[11px] text-[#047857]">
                                {pct}% complete · {formatRM(remaining, { decimals: 0 })} left
                              </p>
                            </div>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#10B981] rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedFeature === 'insights' && (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-[#142B45]">
                      Monthly Income vs. Expenses (RM)
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Arithmetic 6-month comparison
                    </span>
                  </div>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={HERO_TREND_DATA}
                        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 11, fill: '#64748B' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#64748B' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          formatter={(value) => formatRM(Number(value ?? 0))}
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E2E8F0',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                        />
                        <Bar
                          dataKey="income"
                          name="Income"
                          fill="#142B45"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="expenses"
                          name="Expenses"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#64748B]">6-Month Expense Average</p>
                      <p className="font-mono tabular-nums font-semibold text-[#142B45]">
                        RM2,380.00 / month
                      </p>
                    </div>
                    <div>
                      <p className="text-[#64748B]">November vs. 6-Month Avg</p>
                      <p className="font-mono tabular-nums font-semibold text-[#047857]">
                        -RM200.00 lower spending
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedFeature === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <p className="text-xs text-[#64748B]">Monthly Income</p>
                      <p className="mt-1 font-mono tabular-nums text-lg font-bold text-[#142B45]">
                        {formatRM(HERO_METRICS.monthlyIncome)}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <p className="text-xs text-[#64748B]">Total Expenses</p>
                      <p className="mt-1 font-mono tabular-nums text-lg font-bold text-[#1E293B]">
                        {formatRM(HERO_METRICS.totalExpenses)}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                      <p className="text-xs text-[#047857]">Available Balance</p>
                      <p className="mt-1 font-mono tabular-nums text-lg font-bold text-[#047857]">
                        {formatRM(HERO_METRICS.availableBalance)}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <p className="text-xs text-[#64748B]">Monthly Savings</p>
                      <p className="mt-1 font-mono tabular-nums text-lg font-bold text-[#142B45]">
                        {formatRM(HERO_METRICS.currentSavings)}{' '}
                        <span className="text-xs font-normal text-[#64748B]">
                          / {formatRM(HERO_METRICS.monthlySavingsGoal, { decimals: 0 })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    All key monthly balances, goals, and recent ledger items stay aligned in
                    one calm screen so you never have to piece together multiple spreadsheets.
                  </p>
                </div>
              )}
            </div>

            {/* Key Capability Checklist */}
            <ul className="mt-5 space-y-2">
              {activeFeature.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
