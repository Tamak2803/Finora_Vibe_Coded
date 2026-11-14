import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data/finoraData';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="text-xs font-semibold tracking-wide text-[#047857]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
              Clear Answers Before You Begin.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#475569]">
              Everything you should know about how Finora works, who it is built for, and
              what this interactive demonstration includes.
            </p>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-8 divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-button-${item.id}`;
              return (
                <div key={item.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#142B45] group-hover:text-[#047857] transition-colors">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#142B45]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-5 pr-8 text-sm leading-relaxed text-[#475569]"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
