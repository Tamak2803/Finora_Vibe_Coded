import type {
  AudienceProfile,
  BudgetAllocationItem,
  ExpenseCategoryInput,
  FAQItem,
  SampleTransaction,
  SavingsGoalItem,
} from '../types/finance';

export const HERO_METRICS = {
  monthlyIncome: 4500,
  totalExpenses: 2180,
  availableBalance: 2320,
  monthlySavingsGoal: 1000,
  currentSavings: 750,
};

export const HERO_TREND_DATA = [
  { month: 'Jun', income: 4200, expenses: 2490, saved: 620 },
  { month: 'Jul', income: 4200, expenses: 2350, saved: 680 },
  { month: 'Aug', income: 4500, expenses: 2610, saved: 700 },
  { month: 'Sep', income: 4500, expenses: 2390, saved: 740 },
  { month: 'Oct', income: 4500, expenses: 2260, saved: 780 },
  { month: 'Nov', income: 4500, expenses: 2180, saved: 750 },
];

export const HERO_SPENDING_BREAKDOWN = [
  { name: 'Housing', amount: 850, share: 39, color: '#142B45' },
  { name: 'Food & Dining', amount: 540, share: 25, color: '#10B981' },
  { name: 'Transport', amount: 280, share: 13, color: '#0EA5E9' },
  { name: 'Utilities', amount: 210, share: 9, color: '#64748B' },
  { name: 'Lifestyle', amount: 300, share: 14, color: '#F59E0B' },
];

export const SAMPLE_TRANSACTIONS: SampleTransaction[] = [
  {
    id: 'tx-1',
    merchant: 'Jaya Grocer',
    category: 'Food',
    date: '12 Nov · 18:40',
    amount: 142.5,
    type: 'expense',
  },
  {
    id: 'tx-2',
    merchant: 'RapidKL Monthly Pass',
    category: 'Transport',
    date: '11 Nov · 08:15',
    amount: 50.0,
    type: 'expense',
  },
  {
    id: 'tx-3',
    merchant: 'Kinokuniya Books',
    category: 'Education',
    date: '09 Nov · 14:20',
    amount: 118.0,
    type: 'expense',
  },
  {
    id: 'tx-4',
    merchant: 'Uniqlo Mid Valley',
    category: 'Shopping',
    date: '07 Nov · 16:05',
    amount: 169.9,
    type: 'expense',
  },
  {
    id: 'tx-5',
    merchant: 'GSC Cinema & Snacks',
    category: 'Entertainment',
    date: '05 Nov · 20:30',
    amount: 64.0,
    type: 'expense',
  },
  {
    id: 'tx-6',
    merchant: 'Monthly Salary Deposit',
    category: 'Income',
    date: '01 Nov · 09:00',
    amount: 4500.0,
    type: 'income',
  },
];

export const SAMPLE_BUDGET_ALLOCATIONS: BudgetAllocationItem[] = [
  { category: 'Housing & Rent', spent: 900, limit: 950, color: '#142B45' },
  { category: 'Food & Groceries', spent: 650, limit: 750, color: '#10B981' },
  { category: 'Transportation', spent: 280, limit: 350, color: '#0EA5E9' },
  { category: 'Shopping', spent: 265, limit: 280, color: '#F59E0B' },
  { category: 'Entertainment', spent: 180, limit: 250, color: '#6366F1' },
];

export const SAMPLE_SAVINGS_GOALS: SavingsGoalItem[] = [
  {
    id: 'goal-laptop',
    title: 'New Laptop',
    target: 3500,
    saved: 2450,
    monthlyContribution: 350,
    targetDate: 'Feb 2027',
  },
  {
    id: 'goal-emergency',
    title: 'Emergency Fund',
    target: 5000,
    saved: 3200,
    monthlyContribution: 450,
    targetDate: 'Mar 2027',
  },
  {
    id: 'goal-holiday',
    title: 'Holiday Savings',
    target: 2000,
    saved: 960,
    monthlyContribution: 200,
    targetDate: 'Apr 2027',
  },
];

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    id: 'students',
    title: 'University Students',
    shortDescription:
      'Stay on top of your allowance, manage daily spending, and build your first savings habit.',
    problem: 'Monthly allowances run out before the end of semester without clear daily tracking.',
    solution:
      'Categorizes meals, transit, and study expenses so you know your safe weekly spending pace.',
    sampleLabel: 'Sample Weekly Pace',
    sampleMetric: 'RM210.00 / wk',
    sampleCaption: 'Food, campus transit & print materials',
  },
  {
    id: 'young-professionals',
    title: 'Young Professionals',
    shortDescription:
      'Understand your monthly income, balance lifestyle expenses, and plan your financial goals.',
    problem: 'Paychecks arrive regularly, yet lifestyle spending quietly crowds out savings targets.',
    solution:
      'Pairs category limits with goal milestones so you protect savings before discretionary spending.',
    sampleLabel: 'Sample Savings Rate',
    sampleMetric: '22% of Income',
    sampleCaption: 'Automated monthly target allocation',
  },
  {
    id: 'working-adults',
    title: 'Working Adults',
    shortDescription:
      'Organize financial commitments, monitor spending patterns, and maintain better control over your money.',
    problem: 'Rent, utilities, groceries, and recurring bills feel scattered across separate spreadsheets.',
    solution:
      'Brings fixed commitments and everyday purchases into one structured monthly balance view.',
    sampleLabel: 'Sample Fixed vs. Flexible',
    sampleMetric: 'RM1,400 / RM1,280',
    sampleCaption: 'Clear separation of bills and flexible spend',
  },
  {
    id: 'habit-builders',
    title: 'Financial Habit Builders',
    shortDescription:
      'Develop healthier financial habits through clear spending insights and achievable savings targets.',
    problem: 'Inconsistent spending makes it difficult to stick to rigid or overly complicated budgets.',
    solution:
      'Highlights where small adjustments create immediate breathing room without guilt or guesswork.',
    sampleLabel: 'Sample Habit Milestone',
    sampleMetric: 'RM750.00 / RM1,000',
    sampleCaption: 'Visible progress toward monthly reserve',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Money',
    description:
      'Start by organizing your financial information and identifying your income and expenses.',
    outcome: 'See your true starting balance before making monthly commitments.',
  },
  {
    step: '02',
    title: 'Manage Your Spending',
    description:
      'Create budgets, categorize expenses, and monitor how much you spend throughout the month.',
    outcome: 'Spot categories nearing their limits early instead of at month-end.',
  },
  {
    step: '03',
    title: 'Build Better Financial Habits',
    description:
      'Track your savings goals, review your financial insights, and make more informed decisions.',
    outcome: 'Turn consistent weekly awareness into measurable long-term progress.',
  },
];

export const DEFAULT_SIMULATOR_INCOME = 4500;

export const DEFAULT_SIMULATOR_CATEGORIES: ExpenseCategoryInput[] = [
  {
    id: 'housing',
    label: 'Housing',
    amount: 900,
    maxSlider: 3500,
    color: '#142B45',
  },
  {
    id: 'food',
    label: 'Food',
    amount: 650,
    maxSlider: 2500,
    color: '#10B981',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    amount: 300,
    maxSlider: 1500,
    color: '#0EA5E9',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    amount: 250,
    maxSlider: 2000,
    color: '#6366F1',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    amount: 180,
    maxSlider: 1500,
    color: '#F59E0B',
  },
  {
    id: 'utilities',
    label: 'Utilities',
    amount: 200,
    maxSlider: 1000,
    color: '#64748B',
  },
  {
    id: 'other',
    label: 'Other Expenses',
    amount: 200,
    maxSlider: 1500,
    color: '#94A3B8',
  },
];

export const SIMULATOR_PRESETS = [
  {
    id: 'default',
    label: 'Sample (RM4,500)',
    income: 4500,
    amounts: {
      housing: 900,
      food: 650,
      transportation: 300,
      shopping: 250,
      entertainment: 180,
      utilities: 200,
      other: 200,
    },
  },
  {
    id: 'student',
    label: 'Student (RM1,200)',
    income: 1200,
    amounts: {
      housing: 350,
      food: 360,
      transportation: 90,
      shopping: 80,
      entertainment: 70,
      utilities: 60,
      other: 50,
    },
  },
  {
    id: 'overspend',
    label: 'Over-Budget',
    income: 3800,
    amounts: {
      housing: 1500,
      food: 950,
      transportation: 420,
      shopping: 650,
      entertainment: 340,
      utilities: 260,
      other: 220,
    },
  },
];

export const WHY_CHOOSE_FINORA = [
  {
    number: '01',
    title: 'Everything in One Place',
    description:
      'Understand your income, expenses, budgets, and savings through one organized financial overview.',
  },
  {
    number: '02',
    title: 'Easy to Understand',
    description:
      'Clear visualizations and straightforward explanations make personal financial management accessible to beginners.',
  },
  {
    number: '03',
    title: 'Better Financial Awareness',
    description:
      'Identify spending patterns and understand how everyday financial decisions affect your available balance.',
  },
  {
    number: '04',
    title: 'Goals You Can Actually Track',
    description:
      'Monitor savings progress and turn financial intentions into measurable milestones.',
  },
];

export const TRUST_PILLARS = [
  {
    title: 'Privacy First',
    description:
      'Personal financial information should be handled responsibly and only used for clearly communicated purposes — never sold or repurposed without your knowledge.',
  },
  {
    title: 'Transparent Information',
    description:
      'Every figure, utilization percentage, and remaining balance shown in Finora uses straightforward arithmetic so you can verify how numbers are calculated.',
  },
  {
    title: 'User Control',
    description:
      'You decide what numbers to enter, update, or remove. Nothing is locked behind opaque scoring models or automatic account alterations.',
  },
  {
    title: 'Clear Product Limitations',
    description:
      'This welcome experience is a live interactive preview powered by sample data. No bank accounts, payment rails, or external financial institutions are connected here.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-finora',
    question: 'What exactly is Finora?',
    answer:
      'Finora is a personal finance companion designed to make everyday money management clear and approachable. It brings income tracking, expense categorization, monthly budgeting, and savings goal progress into one organized workspace.',
  },
  {
    id: 'who-should-use',
    question: 'Who should use Finora?',
    answer:
      'Finora is designed for university students managing monthly allowances, young professionals balancing lifestyle costs and savings, working adults organizing household commitments, and anyone looking to build steadier financial habits.',
  },
  {
    id: 'suitable-for-students',
    question: 'Is Finora suitable for university students?',
    answer:
      'Yes. You do not need investments, complex tax categories, or high income to benefit from Finora. Even a modest RM1,000–RM1,500 monthly allowance becomes easier to stretch when food, transit, and study costs are clearly tracked.',
  },
  {
    id: 'track-income-expenses',
    question: 'Can I track both income and expenses?',
    answer:
      'Yes. Finora is built around comparing incoming funds against outgoing categories so you always see your remaining balance and overall budget utilization rather than looking at expenses in isolation.',
  },
  {
    id: 'create-monthly-budgets',
    question: 'Can I create monthly budgets?',
    answer:
      'Yes. In the full Finora workflow, you set monthly limits per spending category — such as Food, Transport, Housing, and Shopping — and track utilization bars that flag when a category approaches its limit. You can test the calculation engine right now in our Interactive Spending Simulator.',
  },
  {
    id: 'savings-tracker-work',
    question: 'How does the savings tracker work?',
    answer:
      'You define a specific target amount (for example, RM3,500 for a New Laptop or RM5,000 for an Emergency Fund) and track contributions toward it. Finora displays the accumulated amount, remaining gap, and percentage completed.',
  },
  {
    id: 'connect-bank-account',
    question: 'Does Finora connect to my bank account?',
    answer:
      'No. In this current release, Finora does not connect to any bank accounts, e-wallets, or external financial institutions. All previews and simulator tools operate locally in your browser without linking real accounts.',
  },
  {
    id: 'financial-info-secure',
    question: 'Is my financial information secure?',
    answer:
      'Because this welcome page is an interactive frontend demonstration, no personal banking credentials or real financial records are collected or transmitted to a server. Any numbers you adjust in the simulator stay strictly within your current browser session.',
  },
  {
    id: 'need-financial-knowledge',
    question: 'Do I need financial knowledge to use Finora?',
    answer:
      'Not at all. Finora avoids technical accounting jargon and focuses on plain everyday questions: how much came in, where it went, how much remains, and how close you are to your goals.',
  },
  {
    id: 'demo-real-data',
    question: 'Is the interactive demonstration using real financial data?',
    answer:
      'No. Every transaction row, dashboard metric, and starting simulator budget (RM4,500 monthly income and RM2,680 sample expenses) uses illustrative Malaysian Ringgit (RM) sample data so you can explore the calculations safely before signing up.',
  },
];
