import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ActiveModalType } from '../types/finance';

interface NavbarProps {
  onOpenModal: (modal: ActiveModalType) => void;
}

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
];

export function FinoraLogoMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#142B45" />
      <path
        d="M9 21.5V11.5C9 10.6716 9.67157 10 10.5 10H22"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9 16H18.5"
        stroke="#10B981"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="21.5" cy="20.5" r="2.5" fill="#10B981" />
    </svg>
  );
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#overview');
          }}
          className="flex items-center gap-2.5 text-[#142B45] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10B981] rounded-md"
        >
          <FinoraLogoMark className="w-7 h-7 shrink-0" />
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight">
            Finora
          </span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#142B45] transition-colors duration-150 border-b-2 border-transparent hover:border-[#10B981] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10B981]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Sign In + Primary CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal('sign-in')}
            className="text-sm font-medium text-[#475569] hover:text-[#142B45] px-2 py-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981] rounded-md"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onOpenModal('get-started')}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#142B45] hover:bg-[#0F2136] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#142B45] hover:bg-slate-200/60 transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-2"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-2.5 text-sm font-medium text-[#1E293B] hover:bg-slate-50 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal('sign-in');
              }}
              className="flex-1 py-2.5 px-4 text-sm font-medium text-[#142B45] border border-[#E2E8F0] rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal('get-started');
              }}
              className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-[#142B45] rounded-lg hover:bg-[#0F2136] cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
