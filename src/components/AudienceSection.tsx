import { ArrowUpRight, Briefcase, Compass, GraduationCap, Wallet } from 'lucide-react';
import { AUDIENCE_PROFILES } from '../data/finoraData';

interface AudienceSectionProps {
  onSelectPresetAndScroll?: (presetId: string) => void;
}

const AUDIENCE_ICONS: Record<string, typeof GraduationCap> = {
  students: GraduationCap,
  'young-professionals': Briefcase,
  'working-adults': Wallet,
  'habit-builders': Compass,
};

export function AudienceSection({ onSelectPresetAndScroll }: AudienceSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#047857]">
            Who Finora Helps
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#142B45] text-balance">
            Built for Your Financial Journey.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            Whether you&apos;re managing your first allowance or balancing a full-time income,
            Finora gives you the tools to understand and organize your money.
          </p>
        </div>

        {/* Differentiated Editorial Grid (asymmetric 2x2 structured layout with hairline dividers) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 border border-[#E2E8F0] rounded-2xl overflow-hidden bg-[#F8FAFC]">
          {AUDIENCE_PROFILES.map((profile, idx) => {
            const Icon = AUDIENCE_ICONS[profile.id] ?? Wallet;
            const isPrimarySpot = idx === 0 || idx === 3;
            const colSpan = isPrimarySpot ? 'lg:col-span-7' : 'lg:col-span-5';
            const surfaceBg = isPrimarySpot ? 'bg-white' : 'bg-[#F8FAFC]';

            return (
              <div
                key={profile.id}
                className={`${colSpan} ${surfaceBg} p-6 sm:p-8 flex flex-col justify-between border-b border-[#E2E8F0] ${
                  idx % 2 === 0 ? 'lg:border-r' : ''
                } ${idx >= 2 ? 'lg:border-b-0' : ''} ${idx === 3 ? 'border-b-0' : ''}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D1FAE5]/60 text-[#142B45] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#142B45]">{profile.title}</h3>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-xs text-[#64748B] shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#1E293B]">
                    {profile.shortDescription}
                  </p>

                  {/* Challenge vs Solution structured comparison */}
                  <div className="mt-5 pt-4 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                    <div>
                      <p className="font-semibold text-[#64748B]">Common friction</p>
                      <p className="mt-1 text-[#475569]">{profile.problem}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#047857]">How Finora helps</p>
                      <p className="mt-1 text-[#1E293B]">{profile.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Illustrative Metric + Interactive Link to Demo */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-[#64748B]">{profile.sampleLabel}</p>
                    <p className="font-mono tabular-nums text-sm font-semibold text-[#142B45]">
                      {profile.sampleMetric}{' '}
                      <span className="font-sans font-normal text-xs text-[#64748B]">
                        · {profile.sampleCaption}
                      </span>
                    </p>
                  </div>

                  {onSelectPresetAndScroll && (
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPresetAndScroll(
                          profile.id === 'students' ? 'student' : 'default'
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#142B45] hover:text-[#047857] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Try sample budget
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
