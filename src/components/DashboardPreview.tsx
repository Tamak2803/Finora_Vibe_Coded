import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  HERO_METRICS,
  HERO_SPENDING_BREAKDOWN,
  HERO_TREND_DATA,
  SAMPLE_TRANSACTIONS,
} from '../data/finoraData';
import { calculateProgressPercent, formatRM } from '../utils/finance';

type PreviewTab = 'overview' | 'breakdown' | 'transactions';

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>('overview');
  const savingsPercent = calculateProgressPercent(
    HERO_METRICS.currentSavings,
    HERO_METRICS.monthlySavingsGoal
  );

  return (
    <div
      className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden"
      aria-label="Illustrative Finora personal finance dashboard preview"
    >
      {/* Product Window Chrome Header */}
      <div className="px-4 sm:px-5 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="text-xs text-[#475569] truncate">
            <span className="font-semibold text-[#142B45]">Finora Workspace</span>
            <span className="mx-1.5 text-slate-300" aria-hidden="true">
              /
            </span>
            <span>November Summary</span>
          </div>
        </div>

        {/* Interactive Preview View Switcher */}
        <div
          className="inline-flex items-center p-0.5 bg-slate-200/70 rounded-lg"
          role="tablist"
          aria-label="Dashboard preview views"
        >
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'breakdown', label: 'Breakdown' },
              { id: 'transactions', label: 'Activity' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#142B45] shadow-xs'
                  : 'text-[#475569] hover:text-[#142B45]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Body */}
      <div className="p-4 sm:p-5 space-y-5">
        {/* Top 4 Key Financial Metrics Grid (hairline separated, no nested shadowed boxes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E2E8F0] border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="bg-white p-3 sm:p-3.5">
            <p className="text-[11px] font-medium text-[#64748B]">Monthly Income</p>
            <p className="mt-1 font-mono tabular-nums text-sm sm:text-lg font-semibold text-[#142B45]">
              {formatRM(HERO_METRICS.monthlyIncome)}
            </p>
          </div>
          <div className="bg-white p-3 sm:p-3.5">
            <p className="text-[11px] font-medium text-[#64748B]">Total Expenses</p>
            <p className="mt-1 font-mono tabular-nums text-sm sm:text-lg font-semibold text-[#1E293B]">
              {formatRM(HERO_METRICS.totalExpenses)}
            </p>
          </div>
          <div className="bg-white p-3 sm:p-3.5">
            <p className="text-[11px] font-medium text-[#64748B]">Available Balance</p>
            <p className="mt-1 font-mono tabular-nums text-sm sm:text-lg font-semibold text-[#047857]">
              {formatRM(HERO_METRICS.availableBalance)}
            </p>
          </div>
          <div className="bg-white p-3 sm:p-3.5">
            <p className="text-[11px] font-medium text-[#64748B]">Savings Progress</p>
            <div className="mt-1 flex items-baseline justify-between gap-1">
              <span className="font-mono tabular-nums text-sm sm:text-base font-semibold text-[#142B45]">
                {formatRM(HERO_METRICS.currentSavings, { decimals: 0 })}
              </span>
              <span className="font-mono tabular-nums text-[11px] text-[#64748B]">
                / {formatRM(HERO_METRICS.monthlySavingsGoal, { decimals: 0 })}
              </span>
            </div>
            <div
              className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={savingsPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Monthly savings goal completion"
            >
              <div
                className="h-full bg-[#10B981] rounded-full"
                style={{ width: `${savingsPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Monthly Spending Trend Chart */}
            <div className="md:col-span-7">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xs font-semibold text-[#142B45]">
                  6-Month Income vs. Expenses
                </h3>
                <span className="text-[11px] text-[#64748B] font-mono tabular-nums">
                  Jun – Nov
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={HERO_TREND_DATA}
                    margin={{ top: 6, right: 6, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="finoraIncomeFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#142B45" stopOpacity={0.14} />
                        <stop offset="95%" stopColor="#142B45" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="finoraExpenseFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                      tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
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
                    <Area
                      type="monotone"
                      dataKey="income"
                      name="Income"
                      stroke="#142B45"
                      strokeWidth={2}
                      fill="url(#finoraIncomeFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#finoraExpenseFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#142B45] inline-block" />
                  Income
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#10B981] inline-block" />
                  Expenses
                </span>
              </div>
            </div>

            {/* Compact Recent Activity + Top Category Snapshot */}
            <div className="md:col-span-5 space-y-3 border-t md:border-t-0 md:border-l border-[#E2E8F0] pt-4 md:pt-0 md:pl-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xs font-semibold text-[#142B45]">
                  Recent Transactions
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('transactions')}
                  className="text-[11px] font-medium text-[#047857] hover:underline cursor-pointer"
                >
                  View all
                </button>
              </div>
              <ul className="divide-y divide-[#F1F5F9]">
                {SAMPLE_TRANSACTIONS.slice(0, 4).map((tx) => (
                  <li
                    key={tx.id}
                    className="py-2 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#1E293B] truncate">{tx.merchant}</p>
                      <p className="text-[11px] text-[#64748B]">
                        {tx.category} · {tx.date.split('·')[0].trim()}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums font-medium text-[#1E293B] shrink-0">
                      -{formatRM(tx.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'breakdown' && (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-semibold text-[#142B45]">
                Spending Breakdown (RM2,180.00)
              </h3>
              <span className="text-[11px] text-[#64748B]">Share of monthly expenses</span>
            </div>
            <div className="space-y-2.5">
              {HERO_SPENDING_BREAKDOWN.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E293B]">{cat.name}</span>
                    <span className="font-mono tabular-nums text-[#475569]">
                      {formatRM(cat.amount)} · {cat.share}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${cat.share}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-semibold text-[#142B45]">
                Sample Monthly Ledger
              </h3>
              <span className="text-[11px] text-[#64748B]">6 entries shown</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                    <th className="py-2 font-medium">Description</th>
                    <th className="py-2 font-medium">Category</th>
                    <th className="py-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {SAMPLE_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70">
                      <td className="py-2 font-medium text-[#1E293B]">{tx.merchant}</td>
                      <td className="py-2 text-[#64748B]">{tx.category}</td>
                      <td
                        className={`py-2 text-right font-mono tabular-nums font-medium ${
                          tx.type === 'income' ? 'text-[#047857]' : 'text-[#1E293B]'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '-'}
                        {formatRM(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clear Illustrative Data Footer Note */}
        <div className="pt-2 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#64748B]">
          <span>Illustrative sample data · Malaysian Ringgit (RM)</span>
          <span>Goal pace: {savingsPercent}% of RM1,000 target</span>
        </div>
      </div>
    </div>
  );
}
