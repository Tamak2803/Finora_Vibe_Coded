import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBudgetSummary,
  calculateCategoryDistribution,
  calculateProgressPercent,
  formatRM,
  isValidEmail,
} from './finance';
import type { ExpenseCategoryInput } from '../types/finance';

const SAMPLE_CATEGORIES: ExpenseCategoryInput[] = [
  { id: 'housing', label: 'Housing', amount: 900, maxSlider: 3500, color: '#142B45' },
  { id: 'food', label: 'Food', amount: 650, maxSlider: 2500, color: '#10B981' },
  { id: 'transportation', label: 'Transportation', amount: 300, maxSlider: 1500, color: '#0EA5E9' },
  { id: 'shopping', label: 'Shopping', amount: 250, maxSlider: 2000, color: '#6366F1' },
  { id: 'entertainment', label: 'Entertainment', amount: 180, maxSlider: 1500, color: '#F59E0B' },
  { id: 'utilities', label: 'Utilities', amount: 200, maxSlider: 1000, color: '#64748B' },
  { id: 'other', label: 'Other Expenses', amount: 200, maxSlider: 1500, color: '#94A3B8' },
];

test('formatRM formats positive, zero, and negative Ringgit amounts cleanly', () => {
  assert.equal(formatRM(4500), 'RM4,500.00');
  assert.equal(formatRM(0), 'RM0.00');
  assert.equal(formatRM(-280), '-RM280.00');
  assert.equal(formatRM(1820, { decimals: 0 }), 'RM1,820');
});

test('calculateBudgetSummary matches illustrative starting simulator figures', () => {
  const summary = calculateBudgetSummary(4500, SAMPLE_CATEGORIES);
  assert.equal(summary.monthlyIncome, 4500);
  assert.equal(summary.totalExpenses, 2680);
  assert.equal(summary.remainingBalance, 1820);
  assert.equal(summary.utilizationPercent, 59.6);
  assert.equal(summary.isDeficit, false);
  assert.equal(summary.status, 'healthy');
  assert.equal(summary.statusLabel, 'Within Budget');
});

test('calculateBudgetSummary triggers caution state at >= 85% utilization', () => {
  const highSpend: ExpenseCategoryInput[] = [
    ...SAMPLE_CATEGORIES.slice(0, 6),
    { id: 'other', label: 'Other Expenses', amount: 1520, maxSlider: 3000, color: '#94A3B8' },
  ];
  // 900+650+300+250+180+200+1520 = 4000 / 4500 = 88.9%
  const summary = calculateBudgetSummary(4500, highSpend);
  assert.equal(summary.totalExpenses, 4000);
  assert.equal(summary.remainingBalance, 500);
  assert.equal(summary.utilizationPercent, 88.9);
  assert.equal(summary.isDeficit, false);
  assert.equal(summary.status, 'caution');
  assert.equal(summary.statusLabel, 'Approaching Limit');
});

test('calculateBudgetSummary handles deficit when expenses exceed income', () => {
  const deficitSpend: ExpenseCategoryInput[] = [
    { id: 'housing', label: 'Housing', amount: 3000, maxSlider: 4000, color: '#142B45' },
    ...SAMPLE_CATEGORIES.slice(1),
  ];
  // 3000+650+300+250+180+200+200 = 4780 vs 4500
  const summary = calculateBudgetSummary(4500, deficitSpend);
  assert.equal(summary.totalExpenses, 4780);
  assert.equal(summary.remainingBalance, -280);
  assert.equal(summary.utilizationPercent, 106.2);
  assert.equal(summary.isDeficit, true);
  assert.equal(summary.status, 'deficit');
  assert.equal(summary.statusLabel, 'Over Budget');
});

test('calculateBudgetSummary handles zero income safely without NaN or Infinity', () => {
  const summary = calculateBudgetSummary(0, SAMPLE_CATEGORIES);
  assert.equal(summary.monthlyIncome, 0);
  assert.equal(summary.totalExpenses, 2680);
  assert.equal(summary.remainingBalance, -2680);
  assert.equal(summary.utilizationPercent, 100);
  assert.equal(summary.isDeficit, true);
});

test('calculateCategoryDistribution computes expense shares accurately', () => {
  const dist = calculateCategoryDistribution(4500, SAMPLE_CATEGORIES);
  assert.equal(dist.length, 7);
  // Housing 900 / 2680 = 33.6%
  assert.equal(dist[0].shareOfExpenses, 33.6);
  // Housing 900 / 4500 = 20.0%
  assert.equal(dist[0].shareOfIncome, 20);
});

test('calculateProgressPercent clamps between 0 and 100', () => {
  assert.equal(calculateProgressPercent(750, 1000), 75);
  assert.equal(calculateProgressPercent(1200, 1000), 100);
  assert.equal(calculateProgressPercent(-50, 1000), 0);
  assert.equal(calculateProgressPercent(100, 0), 0);
});

test('isValidEmail validates realistic email inputs', () => {
  assert.equal(isValidEmail('aisyah@example.com'), true);
  assert.equal(isValidEmail('  hafiz.rahman@uni.edu.my  '), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('user@domain'), false);
  assert.equal(isValidEmail(''), false);
});
