import { Eye, LockKeyhole, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { TRUST_PILLARS, WHY_CHOOSE_FINORA } from '../data/finoraData';

const TRUST_ICONS = [LockKeyhole, Eye, SlidersHorizontal, ShieldCheck];

export function TrustSection() {
  return (
    <section id="about" className="bg-white border-b border-[#E2E8F0]">
      {/* Part A: Why Choose Finora? */}
      <div className="py-16 lg:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#047857]">
                Why Choose Finora
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
                Financial Clarity Without the Complexity.
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                Personal finance tools fail when they overwhelm beginners with cluttered
                tables. Finora focuses on what actually improves day-to-day money decisions.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {WHY_CHOOSE_FINORA.map((adv) => (
                <div
                  key={adv.number}
                  className="pt-4 border-t border-[#E2E8F0] space-y-2"
                >
                  <span className="font-mono tabular-nums text-xs font-semibold text-[#047857]">
                    {adv.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#142B45]">
                    {adv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#475569]">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Part B: Trust, Privacy and Transparency */}
      <div className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#047857]">
              Trust & Transparency
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
              Your Financial Information Deserves Care.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">
              Credibility comes from being clear about how calculations work, how data is
              handled, and what this product preview does and does not connect to.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = TRUST_ICONS[idx] ?? ShieldCheck;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#142B45] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[#142B45]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
