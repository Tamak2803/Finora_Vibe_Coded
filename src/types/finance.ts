export type ExpenseCategoryId =
  | 'housing'
  | 'food'
  | 'transportation'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'other';

export interface ExpenseCategoryInput {
  id: ExpenseCategoryId;
  label: string;
  amount: number;
  maxSlider: number;
  color: string;
}

export type BudgetHealthStatus = 'healthy' | 'caution' | 'deficit';

export interface BudgetSummary {
  monthlyIncome: number;
  totalExpenses: number;
  remainingBalance: number;
  utilizationPercent: number;
  isDeficit: boolean;
  status: BudgetHealthStatus;
  statusLabel: string;
}

export interface CategoryDistributionItem {
  id: ExpenseCategoryId;
  label: string;
  amount: number;
  shareOfExpenses: number;
  shareOfIncome: number;
  color: string;
}

export type TransactionCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Education'
  | 'Entertainment'
  | 'Utilities'
  | 'Income';

export interface SampleTransaction {
  id: string;
  merchant: string;
  category: TransactionCategory;
  date: string;
  amount: number;
  type: 'expense' | 'income';
}

export interface BudgetAllocationItem {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export interface SavingsGoalItem {
  id: string;
  title: string;
  target: number;
  saved: number;
  monthlyContribution: number;
  targetDate: string;
}

export interface AudienceProfile {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  sampleLabel: string;
  sampleMetric: string;
  sampleCaption: string;
}

export type FeatureKey =
  | 'tracking'
  | 'budgets'
  | 'savings'
  | 'insights'
  | 'overview';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type ActiveModalType =
  | null
  | 'get-started'
  | 'sign-in'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'education'
  | 'help';
