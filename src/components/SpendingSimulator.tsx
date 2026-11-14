import { AlertTriangle, CheckCircle2, Info, RotateCcw } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SIMULATOR_PRESETS } from '../data/finoraData';
import type { ExpenseCategoryId, ExpenseCategoryInput } from '../types/finance';
import {
  calculateBudgetSummary,
  calculateCategoryDistribution,
  formatRM,
  sanitizeAmount,
} from '../utils/finance';

interface SpendingSimulatorProps {
  monthlyIncome: number;
  categories: ExpenseCategoryInput[];
  onIncomeChange: (income: number) => void;
  onCategoryChange: (id: ExpenseCategoryId, amount: number) => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
}

export function SpendingSimulator({
  monthlyIncome,
  categories,
  onIncomeChange,
  onCategoryChange,
  onApplyPreset,
  onReset,
}: SpendingSimulatorProps) {
  const summary = calculateBudgetSummary(monthlyIncome, categories);
  const distribution = calculateCategoryDistribution(monthlyIncome, categories);

  const chartData = distribution.filter((d) => d.amount > 0);
  const deficitAmount = Math.abs(summary.remainingBalance);

  const activePresetId =
    SIMULATOR_PRESETS.find(
      (preset) =>
        preset.income === monthlyIncome &&
        categories.every((cat) => preset.amounts[cat.id] === cat.amount)
    )?.id ?? null;

  return (
    <section
      id="demo"
      className="py-14 lg:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Quick Scenario Presets */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-[#047857]">
              Interactive Product Demonstration
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
              Experience Better Money Management.
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[#475569]">
              Explore how Finora helps you understand your finances. No registration required.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
            {SIMULATOR_PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onApplyPreset(preset.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#142B45] text-white border-[#142B45]'
                      : 'bg-white text-[#142B45] border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#142B45] bg-[#E2E8F0]/70 hover:bg-[#E2E8F0] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Demonstration
            </button>
          </div>
        </div>

        {/* Simulator Workspace */}
        <div className="mt-7 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Income & Category Controls */}
            <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] space-y-5">
              {/* Monthly Income Control */}
              <div className="pb-4 border-b border-[#E2E8F0]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label
                    htmlFor="sim-monthly-income"
                    className="text-sm font-bold text-[#142B45]"
                  >
                    Monthly Income (RM)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#64748B]">RM</span>
                    <input
                      id="sim-monthly-income-number"
                      type="number"
                      min={0}
                      max={25000}
                      step={50}
                      aria-label="Monthly income numeric input"
                      value={monthlyIncome}
                      onChange={(e) =>
                        onIncomeChange(sanitizeAmount(Number(e.target.value), 25000))
                      }
                      className="w-28 px-2.5 py-1.5 text-right font-mono tabular-nums text-sm font-semibold text-[#142B45] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-2 focus:outline-[#10B981]"
                    />
                  </div>
                </div>
                <input
                  id="sim-monthly-income"
                  type="range"
                  min={0}
                  max={12000}
                  step={100}
                  value={Math.min(monthlyIncome, 12000)}
                  onChange={(e) => onIncomeChange(Number(e.target.value))}
                  className="mt-3 w-full finora-slider"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-mono tabular-nums text-[#64748B]">
                  <span>RM0</span>
                  <span>RM6,000</span>
                  <span>RM12,000</span>
                </div>
              </div>

              {/* Expense Category Sliders */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#142B45]">
                    Monthly Expense Categories
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Adjust sliders or enter exact RM values
                  </span>
                </div>

                <div className="space-y-3">
                  {categories.map((cat) => {
                    const inputId = `sim-cat-${cat.id}`;
                    const numId = `sim-cat-num-${cat.id}`;
                    return (
                      <div key={cat.id} className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <label
                            htmlFor={inputId}
                            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1E293B]"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-xs shrink-0"
                              style={{ backgroundColor: cat.color }}
                              aria-hidden="true"
                            />
                            {cat.label}
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono text-[#64748B]">RM</span>
                            <input
                              id={numId}
                              type="number"
                              min={0}
                              max={25000}
                              step={10}
                              aria-label={`${cat.label} expense numeric input`}
                              value={cat.amount}
                              onChange={(e) =>
                                onCategoryChange(
                                  cat.id,
                                  sanitizeAmount(Number(e.target.value), 25000)
                                )
                              }
                              className="w-24 px-2 py-1 text-right font-mono tabular-nums text-xs sm:text-sm font-medium text-[#142B45] bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-2 focus:outline-[#10B981]"
                            />
                          </div>
                        </div>

                        <input
                          id={inputId}
                          type="range"
                          min={0}
                          max={cat.maxSlider}
                          step={10}
                          value={Math.min(cat.amount, cat.maxSlider)}
                          onChange={(e) =>
                            onCategoryChange(cat.id, Number(e.target.value))
                          }
                          className="w-full finora-slider"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Real-Time Calculations & Donut Visualization */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#F8FAFC]/60 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Status Bar (Icon + Explicit Text Label, never color-only) */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#64748B]">
                    Live Budget Summary
                  </span>
                  <span
                    data-testid="simulator-status-label"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      summary.status === 'deficit'
                        ? 'text-[#DC2626]'
                        : summary.status === 'caution'
                          ? 'text-[#B45309]'
                          : 'text-[#047857]'
                    }`}
                  >
                    {summary.status === 'deficit' ? (
                      <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    ) : summary.status === 'caution' ? (
                      <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    )}
                    {summary.statusLabel}
                  </span>
                </div>

                {/* Deficit or High-Utilization Alert Banner */}
                {summary.isDeficit && (
                  <div
                    role="alert"
                    data-testid="deficit-warning"
                    className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs leading-relaxed text-[#991B1B] flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626]" />
                    <div>
                      <p className="font-semibold">Expenses exceed monthly income</p>
                      <p className="mt-0.5">
                        Your planned spending exceeds your income by{' '}
                        <span className="font-mono tabular-nums font-semibold">
                          {formatRM(deficitAmount)}
                        </span>
                        . Reduce one or more categories or adjust monthly income to restore
                        a positive balance.
                      </p>
                    </div>
                  </div>
                )}

                {!summary.isDeficit && summary.status === 'caution' && (
                  <div
                    role="status"
                    className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs leading-relaxed text-[#92400E] flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#D97706]" />
                    <div>
                      <p className="font-semibold">Approaching monthly income limit</p>
                      <p className="mt-0.5">
                        You have allocated{' '}
                        <span className="font-mono tabular-nums font-semibold">
                          {summary.utilizationPercent}%
                        </span>{' '}
                        of your income, leaving little margin for unexpected expenses.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4 Key Calculated Figures */}
                <div className="grid grid-cols-2 gap-px bg-[#E2E8F0] border border-[#E2E8F0] rounded-xl overflow-hidden">
                  <div className="bg-white p-3.5">
                    <p className="text-[11px] text-[#64748B]">Total Income</p>
                    <p
                      data-testid="sim-total-income"
                      className="mt-1 font-mono tabular-nums text-base sm:text-lg font-bold text-[#142B45]"
                    >
                      {formatRM(summary.monthlyIncome)}
                    </p>
                  </div>
                  <div className="bg-white p-3.5">
                    <p className="text-[11px] text-[#64748B]">Total Expenses</p>
                    <p
                      data-testid="sim-total-expenses"
                      className="mt-1 font-mono tabular-nums text-base sm:text-lg font-bold text-[#1E293B]"
                    >
                      {formatRM(summary.totalExpenses)}
                    </p>
                  </div>
                  <div className="bg-white p-3.5">
                    <p className="text-[11px] text-[#64748B]">Remaining Balance</p>
                    <p
                      data-testid="sim-remaining-balance"
                      className={`mt-1 font-mono tabular-nums text-base sm:text-lg font-bold ${
                        summary.isDeficit ? 'text-[#DC2626]' : 'text-[#047857]'
                      }`}
                    >
                      {formatRM(summary.remainingBalance)}
                    </p>
                  </div>
                  <div className="bg-white p-3.5">
                    <p className="text-[11px] text-[#64748B]">Budget Utilization</p>
                    <p
                      data-testid="sim-utilization"
                      className={`mt-1 font-mono tabular-nums text-base sm:text-lg font-bold ${
                        summary.status === 'deficit'
                          ? 'text-[#DC2626]'
                          : summary.status === 'caution'
                            ? 'text-[#B45309]'
                            : 'text-[#142B45]'
                      }`}
                    >
                      {summary.utilizationPercent}%
                    </p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#64748B]">
                    <span>Spending vs. Monthly Income</span>
                    <span className="font-mono tabular-nums">
                      {formatRM(summary.totalExpenses, { decimals: 0 })} /{' '}
                      {formatRM(summary.monthlyIncome, { decimals: 0 })}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${Math.min(100, summary.utilizationPercent)}%`,
                        backgroundColor:
                          summary.status === 'deficit'
                            ? '#DC2626'
                            : summary.status === 'caution'
                              ? '#F59E0B'
                              : '#10B981',
                      }}
                    />
                  </div>
                </div>

                {/* Interactive Donut Chart */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xs font-semibold text-[#142B45]">
                      Spending Distribution
                    </h3>
                    <span className="text-[11px] text-[#64748B]">Share of expenses</span>
                  </div>

                  {chartData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4">
                      <div className="sm:col-span-5 h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              dataKey="amount"
                              nameKey="label"
                              cx="50%"
                              cy="50%"
                              innerRadius={42}
                              outerRadius={68}
                              paddingAngle={2}
                            >
                              {chartData.map((entry) => (
                                <Cell key={entry.id} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => formatRM(Number(value ?? 0))}
                              contentStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#E2E8F0',
                                borderRadius: '8px',
                                fontSize: '12px',
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <ul className="sm:col-span-7 space-y-1.5 text-xs">
                        {distribution.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="flex items-center gap-2 text-[#334155] truncate">
                              <span
                                className="w-2 h-2 rounded-xs shrink-0"
                                style={{ backgroundColor: item.color }}
                                aria-hidden="true"
                              />
                              <span className="truncate">{item.label}</span>
                            </span>
                            <span className="font-mono tabular-nums text-[#142B45] shrink-0">
                              {item.shareOfExpenses}%
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="py-10 text-center text-xs text-[#64748B]">
                      All expense categories are currently RM0.00. Adjust any slider to
                      visualize your spending distribution.
                    </div>
                  )}
                </div>
              </div>

              {/* Mandatory Simulator Disclaimer */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-start gap-2 text-xs text-[#64748B]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#475569]" aria-hidden="true" />
                <p>
                  This is an interactive demonstration using sample financial data. No real
                  financial accounts or transactions are connected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
