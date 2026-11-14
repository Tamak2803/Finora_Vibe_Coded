import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/finoraData';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#047857]">
              How Finora Works
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
              Three Simple Steps to Financial Clarity.
            </h2>
          </div>
          <p className="text-sm text-[#475569] max-w-md">
            Designed so anyone can organize everyday finances in minutes — no accounting jargon
            or spreadsheet formulas required.
          </p>
        </div>

        {/* 3-Step Visual Progression */}
        <div className="mt-12 relative">
          {/* Desktop horizontal connector rail */}
          <div
            className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-[#CBD5E1]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <div key={item.step} className="relative flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#142B45] text-white font-mono tabular-nums text-sm font-semibold flex items-center justify-center shrink-0 relative z-10">
                    {item.step}
                  </div>
                  {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                    <ArrowRight
                      className="hidden lg:block w-4 h-4 text-[#94A3B8] ml-auto relative z-10 bg-[#F8FAFC] px-0.5"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="mt-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#142B45]">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                      {item.description}
                    </p>
                  </div>
                  <p className="mt-5 pt-4 border-t border-[#F1F5F9] text-xs font-medium text-[#047857]">
                    {item.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
