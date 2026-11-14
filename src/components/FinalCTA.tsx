import { ArrowRight } from 'lucide-react';
import type { ActiveModalType } from '../types/finance';

interface FinalCTAProps {
  onOpenModal: (modal: ActiveModalType) => void;
}

export function FinalCTA({ onOpenModal }: FinalCTAProps) {
  const scrollToDemo = () => {
    const el = document.querySelector('#demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#142B45] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold tracking-wide text-[#A7F3D0]">
          Ready When You Are
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
          Your Financial Journey Starts With Clarity.
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto">
          Take the first step towards understanding your money, managing your spending, and
          building better financial habits with Finora.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onOpenModal('get-started')}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#142B45] bg-[#10B981] hover:bg-[#34D399] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get Started with Finora
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={scrollToDemo}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore the Demo
          </button>
        </div>
      </div>
    </section>
  );
}
