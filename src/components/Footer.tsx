import type { ActiveModalType } from '../types/finance';
import { FinoraLogoMark } from './Navbar';

interface FooterProps {
  onOpenModal: (modal: ActiveModalType) => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] pt-14 pb-10 text-sm text-[#475569]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E2E8F0]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5 text-[#142B45]">
              <FinoraLogoMark className="w-7 h-7" />
              <span className="font-[var(--font-display)] text-lg font-bold tracking-tight">
                Finora
              </span>
            </div>
            <p className="text-xs font-medium text-[#047857]">
              Your Money. Your Clarity. Your Control.
            </p>
            <p className="text-sm leading-relaxed text-[#64748B] max-w-sm">
              A personal finance companion built to help students, young professionals, and
              working adults understand expenses, manage monthly budgets, and stay on track
              with savings goals.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#142B45]">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#overview"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#overview');
                  }}
                  className="hover:text-[#142B45] transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#features');
                  }}
                  className="hover:text-[#142B45] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#how-it-works');
                  }}
                  className="hover:text-[#142B45] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#demo');
                  }}
                  className="hover:text-[#142B45] transition-colors"
                >
                  Interactive Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#142B45]">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#faq');
                  }}
                  className="hover:text-[#142B45] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('education')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Financial Education
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('help')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#142B45]">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('disclaimer')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Community / Social Placeholders (clearly labeled) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#142B45]">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('get-started')}
                  className="hover:text-[#142B45] transition-colors cursor-pointer text-left"
                >
                  Product Updates
                </button>
              </li>
              <li>
                <span className="text-xs text-[#64748B]">
                  LinkedIn · Coming Soon
                </span>
              </li>
              <li>
                <span className="text-xs text-[#64748B]">
                  Instagram · Coming Soon
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Transparency Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>&copy; {new Date().getFullYear()} Finora. All rights reserved.</p>
          <p>
            Interactive Product Preview · Sample Malaysian Ringgit (RM) data only · No
            external bank connections.
          </p>
        </div>
      </div>
    </footer>
  );
}
