import { useState } from 'react';
import { AudienceSection } from './components/AudienceSection';
import { FAQ } from './components/FAQ';
import { Features } from './components/Features';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { InfoModals } from './components/InfoModals';
import { Navbar } from './components/Navbar';
import { SpendingSimulator } from './components/SpendingSimulator';
import { TrustSection } from './components/TrustSection';
import {
  DEFAULT_SIMULATOR_CATEGORIES,
  DEFAULT_SIMULATOR_INCOME,
  SIMULATOR_PRESETS,
} from './data/finoraData';
import type {
  ActiveModalType,
  ExpenseCategoryId,
  ExpenseCategoryInput,
} from './types/finance';

export default function App() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(DEFAULT_SIMULATOR_INCOME);
  const [categories, setCategories] = useState<ExpenseCategoryInput[]>(
    DEFAULT_SIMULATOR_CATEGORIES
  );
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const handleCategoryChange = (id: ExpenseCategoryId, amount: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, amount } : cat))
    );
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = SIMULATOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setMonthlyIncome(preset.income);
    setCategories(
      DEFAULT_SIMULATOR_CATEGORIES.map((cat) => ({
        ...cat,
        amount: preset.amounts[cat.id],
      }))
    );
  };

  const handleResetDemo = () => {
    setMonthlyIncome(DEFAULT_SIMULATOR_INCOME);
    setCategories(DEFAULT_SIMULATOR_CATEGORIES);
  };

  const scrollToDemo = () => {
    const el = document.querySelector('#demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPresetAndScroll = (presetId: string) => {
    handleApplyPreset(presetId);
    scrollToDemo();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1E293B]">
      <Navbar onOpenModal={setActiveModal} />

      <main className="flex-1">
        <Hero />
        <AudienceSection onSelectPresetAndScroll={handleSelectPresetAndScroll} />
        <HowItWorks />
        <Features />
        <SpendingSimulator
          monthlyIncome={monthlyIncome}
          categories={categories}
          onIncomeChange={setMonthlyIncome}
          onCategoryChange={handleCategoryChange}
          onApplyPreset={handleApplyPreset}
          onReset={handleResetDemo}
        />
        <TrustSection />
        <FAQ />
        <FinalCTA onOpenModal={setActiveModal} />
      </main>

      <Footer onOpenModal={setActiveModal} />

      <InfoModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onJumpToDemo={scrollToDemo}
      />
    </div>
  );
}
