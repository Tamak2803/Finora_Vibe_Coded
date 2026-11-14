import { CheckCircle2, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ActiveModalType } from '../types/finance';
import { isValidEmail } from '../utils/finance';

interface InfoModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  onJumpToDemo: () => void;
}

export function InfoModals({ activeModal, onClose, onJumpToDemo }: InfoModalsProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Young Professional');
  const [emailError, setEmailError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const handleResetWaitlist = () => {
    setSubmittedEmail(null);
    setEmail('');
    setEmailError('');
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address (for example, name@example.com).');
      return;
    }
    setEmailError('');
    setSubmittedEmail(email.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finora-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4 bg-[#F8FAFC]">
          <h2 id="finora-modal-title" className="text-base font-bold text-[#142B45]">
            {activeModal === 'get-started' && 'Explore Finora Early Access'}
            {activeModal === 'sign-in' && 'Finora Account Sign In'}
            {activeModal === 'education' && 'Financial Education Guide'}
            {activeModal === 'help' && 'Finora Help Center'}
            {activeModal === 'privacy' && 'Privacy Policy'}
            {activeModal === 'terms' && 'Terms of Service'}
            {activeModal === 'disclaimer' && 'Product & Sample Data Disclaimer'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#142B45] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-sm leading-relaxed text-[#475569]">
          {activeModal === 'get-started' && (
            <>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#334155]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#047857]" aria-hidden="true" />
                <p>
                  This site is an interactive frontend product preview. Account creation and
                  saved cloud workspaces are currently in development and are not active on
                  this page.
                </p>
              </div>

              {submittedEmail ? (
                <div className="p-5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3">
                  <div className="flex items-center gap-2 text-[#047857] font-semibold">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Preview Interest Recorded</span>
                  </div>
                  <p className="text-xs text-[#065F46]">
                    Thank you. We recorded your preview interest for{' '}
                    <span className="font-mono font-semibold">{submittedEmail}</span> ({role}
                    ) in this session. No live account or bank link has been created.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onJumpToDemo();
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#142B45] hover:bg-[#0F2136] rounded-lg cursor-pointer"
                    >
                      Try Spending Simulator
                    </button>
                    <button
                      type="button"
                      onClick={handleResetWaitlist}
                      className="px-4 py-2 text-xs font-medium text-[#142B45] bg-white border border-[#E2E8F0] rounded-lg cursor-pointer"
                    >
                      Edit Entry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} noValidate className="space-y-4">
                  <p className="text-sm text-[#475569]">
                    You can test the full monthly budgeting engine immediately in the
                    simulator, or leave your email below to register interest for Finora&apos;s
                    upcoming full release.
                  </p>

                  <div>
                    <label
                      htmlFor="early-access-email"
                      className="block text-xs font-semibold text-[#142B45] mb-1.5"
                    >
                      Email address
                    </label>
                    <input
                      id="early-access-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm text-[#142B45] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-2 focus:outline-[#10B981]"
                    />
                    {emailError && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="early-access-role"
                      className="block text-xs font-semibold text-[#142B45] mb-1.5"
                    >
                      Which best describes your focus?
                    </label>
                    <select
                      id="early-access-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-[#142B45] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-2 focus:outline-[#10B981]"
                    >
                      <option value="University Student">University Student</option>
                      <option value="Young Professional">Young Professional</option>
                      <option value="Working Adult">Working Adult</option>
                      <option value="Building Financial Habits">
                        Building Financial Habits
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onJumpToDemo();
                      }}
                      className="text-xs font-semibold text-[#047857] hover:underline cursor-pointer"
                    >
                      Skip to Interactive Demo
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-[#142B45] hover:bg-[#0F2136] rounded-xl transition-colors cursor-pointer"
                    >
                      Request Early Access
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {activeModal === 'sign-in' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#334155]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#142B45]" aria-hidden="true" />
                <p>
                  User authentication is not yet enabled on this welcome page. Finora
                  currently operates as an open, registration-free product demonstration.
                </p>
              </div>
              <p>
                You do not need an account to try Finora&apos;s monthly budgeting calculations.
                Launch the interactive spending simulator directly to test income, expenses,
                and category distributions.
              </p>
              <div className="pt-2 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#475569] border border-[#E2E8F0] rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onJumpToDemo();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#142B45] hover:bg-[#0F2136] rounded-lg cursor-pointer"
                >
                  Open Interactive Simulator
                </button>
              </div>
            </div>
          )}

          {activeModal === 'education' && (
            <div className="space-y-3">
              <p className="font-semibold text-[#142B45]">
                Three Practical Habits for Monthly Clarity
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>Separate fixed commitments from flexible spend:</strong> List rent
                  and utilities first so your remaining allowance for food, transit, and
                  shopping is unmistakable.
                </li>
                <li>
                  <strong>Review utilization mid-month:</strong> Watching category progress
                  around day 15 prevents surprises before month-end.
                </li>
                <li>
                  <strong>Name your savings goals:</strong> Assigning a concrete target such
                  as an Emergency Fund (RM5,000) makes monthly contributions intentional.
                </li>
              </ul>
            </div>
          )}

          {activeModal === 'help' && (
            <div className="space-y-3">
              <p>
                Need help navigating the Finora interactive welcome page?
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>
                  Use the <strong>Dashboard Preview</strong> tabs at the top to inspect
                  trends, category breakdowns, and recent activity.
                </li>
                <li>
                  Scroll to <strong>Experience Better Money Management</strong> to adjust
                  sliders or type exact Ringgit values.
                </li>
                <li>
                  Click <strong>Reset Demonstration</strong> anytime to return to the RM4,500
                  sample budget.
                </li>
              </ul>
            </div>
          )}

          {activeModal === 'privacy' && (
            <div className="space-y-3">
              <p>
                Finora is designed around a Privacy-First principle: personal financial
                details belong strictly to the user.
              </p>
              <p>
                On this welcome and demonstration site, no bank credentials, transaction
                feeds, or server-stored financial profiles are collected. Adjustments made in
                the spending simulator run locally inside your browser session.
              </p>
            </div>
          )}

          {activeModal === 'terms' && (
            <div className="space-y-3">
              <p>
                This Finora welcome experience is provided for informational and product
                demonstration purposes.
              </p>
              <p>
                Calculations performed in the interactive spending simulator reflect
                user-entered inputs and straightforward arithmetic formulas (Remaining Balance
                = Monthly Income − Total Expenses). It does not constitute licensed financial,
                tax, or investment advice.
              </p>
            </div>
          )}

          {activeModal === 'disclaimer' && (
            <div className="space-y-3">
              <p>
                All account balances, transactions, savings goals, and spending charts shown
                throughout this page use illustrative Malaysian Ringgit (RM) sample data.
              </p>
              <p>
                Finora does not currently connect to live bank accounts, e-wallets, or
                payment networks, and makes no claim of banking partnerships or regulatory
                endorsements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
