import type {
  BudgetHealthStatus,
  BudgetSummary,
  CategoryDistributionItem,
  ExpenseCategoryInput,
} from '../types/finance';

/**
 * Formats a numeric value in Malaysian Ringgit (RM).
 * Handles negative values cleanly as `-RM280.00`.
 */
export function formatRM(value: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 2;
  const safeValue = Number.isFinite(value) ? value : 0;
  const isNegative = safeValue < 0;
  const absValue = Math.abs(safeValue);
  const formattedNumber = absValue.toLocaleString('en-MY', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}RM${formattedNumber}`;
}

/**
 * Clamps and sanitizes non-negative numeric input values.
 */
export function sanitizeAmount(value: number, max = 50000): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(Math.round(value), max);
}

/**
 * Calculates total expenses, remaining balance, utilization %, and health status.
 */
export function calculateBudgetSummary(
  monthlyIncome: number,
  categories: Pick<ExpenseCategoryInput, 'amount'>[]
): BudgetSummary {
  const safeIncome = sanitizeAmount(monthlyIncome, 100000);
  const totalExpenses = categories.reduce(
    (sum, item) => sum + sanitizeAmount(item.amount, 100000),
    0
  );
  const remainingBalance = safeIncome - totalExpenses;

  let utilizationPercent = 0;
  if (safeIncome > 0) {
    utilizationPercent = Math.round(((totalExpenses / safeIncome) * 100) * 10) / 10;
  } else if (totalExpenses > 0) {
    utilizationPercent = 100;
  }

  const isDeficit = remainingBalance < 0;

  let status: BudgetHealthStatus = 'healthy';
  let statusLabel = 'Within Budget';

  if (isDeficit || (safeIncome === 0 && totalExpenses > 0)) {
    status = 'deficit';
    statusLabel = 'Over Budget';
  } else if (utilizationPercent >= 85) {
    status = 'caution';
    statusLabel = 'Approaching Limit';
  }

  return {
    monthlyIncome: safeIncome,
    totalExpenses,
    remainingBalance,
    utilizationPercent,
    isDeficit,
    status,
    statusLabel,
  };
}

/**
 * Builds percentage distribution for each expense category for chart & table rendering.
 */
export function calculateCategoryDistribution(
  monthlyIncome: number,
  categories: ExpenseCategoryInput[]
): CategoryDistributionItem[] {
  const summary = calculateBudgetSummary(monthlyIncome, categories);
  const { totalExpenses, monthlyIncome: safeIncome } = summary;

  return categories.map((cat) => {
    const safeAmount = sanitizeAmount(cat.amount, 100000);
    const shareOfExpenses =
      totalExpenses > 0
        ? Math.round(((safeAmount / totalExpenses) * 100) * 10) / 10
        : 0;
    const shareOfIncome =
      safeIncome > 0
        ? Math.round(((safeAmount / safeIncome) * 100) * 10) / 10
        : 0;

    return {
      id: cat.id,
      label: cat.label,
      amount: safeAmount,
      shareOfExpenses,
      shareOfIncome,
      color: cat.color,
    };
  });
}

/**
 * Calculates clamped percentage completion for savings goals or category budgets.
 */
export function calculateProgressPercent(current: number, target: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(target) || target <= 0) {
    return 0;
  }
  const raw = (current / target) * 100;
  return Math.max(0, Math.min(100, Math.round(raw * 10) / 10));
}

/**
 * Validates an email address format for the optional early-access notice form.
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}
