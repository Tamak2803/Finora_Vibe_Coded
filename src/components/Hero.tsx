import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DashboardPreview } from './DashboardPreview';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="pt-10 pb-14 lg:pt-14 lg:pb-20 border-b border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Immediate Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-xs font-medium tracking-wide text-[#047857]">
              Finora Personal Finance · Your Money. Your Clarity. Your Control.
            </p>

            <h1 className="text-[clamp(2.25rem,3.8vw,3.35rem)] font-bold tracking-tight leading-[1.1] text-[#142B45] text-balance">
              Your Money, Finally Under Control.
            </h1>

            <p className="text-base sm:text-[17px] leading-relaxed text-[#475569] max-w-xl">
              Finora helps you track expenses, manage your budget, and grow your savings — all
              through one simple financial dashboard. Understand where your money goes and make
              every financial decision with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('#demo')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#142B45] hover:bg-[#0F2136] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
              >
                Explore Finora
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#how-it-works')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#142B45] bg-white border border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
              >
                <PlayCircle className="w-4 h-4 text-[#047857]" aria-hidden="true" />
                See How It Works
              </button>
            </div>

            {/* Quiet key clarity strip without pill capsules */}
            <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-semibold text-[#142B45]">Expense Clarity</p>
                <p className="mt-0.5 text-[#64748B]">Categorized daily spending</p>
              </div>
              <div>
                <p className="font-semibold text-[#142B45]">Monthly Budgets</p>
                <p className="mt-0.5 text-[#64748B]">Clear limits by category</p>
              </div>
              <div>
                <p className="font-semibold text-[#142B45]">Savings Milestones</p>
                <p className="mt-0.5 text-[#64748B]">Track goals at a glance</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent Realistic Product Preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
