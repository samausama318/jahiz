import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Gauge, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import { portalFor, useAuth } from '../../auth/authContext';

type SectionLink = { label: string; target: string };

/** In-page section anchors: `target` is the element id to scroll to ('' = page top). */
const LINKS: SectionLink[] = [
  { label: 'الرئيسية', target: '' },
  { label: 'عن جاهز', target: 'about' },
  { label: 'كيف يعمل', target: 'how' },
  { label: 'الخدمات', target: 'services' },
  { label: 'مراحل التقييم', target: 'assessment' },
  { label: 'الأسئلة الشائعة', target: 'faq' },
];

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/**
 * Header of the public marketing pages. It never shows the portal navigation: a signed-in
 * visitor gets one button to their own portal instead. The section links are pure in-page
 * anchors, so they stay visible for every visitor, signed-in included.
 */
export const PublicHeader: React.FC = () => {
  const { user, status } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(() =>
    window.location.pathname === '/' ? window.location.hash.replace('#', '') : null,
  );

  /** SPA-correct section jump: never reloads the page, only navigates when not on `/`. */
  const goToSection = (target: string) => {
    setActiveTarget(target);
    if (window.location.pathname !== '/') {
      navigate(target ? `/#${target}` : '/');
      return;
    }
    if (!target) {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      return;
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    else window.scrollTo({ top: 0 });
  };

  const linkClass = (isActive: boolean) =>
    `whitespace-nowrap px-2.5 py-2 lg:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
      isActive ? 'bg-[#FFF3E6] text-[#003E82]' : 'text-[#667085] hover:bg-[#F7F9FC] hover:text-[#172033]'
    }`;

  const action =
    status === 'loading' ? (
      <span className="w-28 h-9 rounded-xl bg-[#E6EAF0] animate-pulse" aria-hidden="true" />
    ) : user ? (
      <button
        type="button"
        onClick={() => navigate(portalFor(user.role))}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003E82] hover:bg-[#002E63] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
      >
        <LayoutDashboard className="w-4 h-4" />
        الذهاب إلى بوابتي
      </button>
    ) : (
      <span className="inline-flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003E82] hover:bg-[#002E63] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          تسجيل الدخول
        </button>
        <button
          type="button"
          onClick={() => navigate('/factory/assessment')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF8A00] hover:bg-[#E85B00] text-white text-xs font-bold shadow-md shadow-black/10 transition-colors cursor-pointer"
        >
          <Gauge className="w-4 h-4" />
          ابدأ تقييم مصنعك
        </button>
      </span>
    );

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2.5 min-w-0" aria-label="جاهز - الصفحة الرئيسية">
          <img src="/jahiz-logo-vector.svg" alt="Jahiz" className="h-14 w-auto object-contain" />
          <div className="leading-none">
            <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-[#003E82] to-[#0877E8]">جاهز</div>
            <div className="mt-1 text-[11px] font-extrabold tracking-[0.22em] text-[#667085]">JAHEZ</div>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1" aria-label="التنقل الرئيسي">
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goToSection(link.target)}
              aria-current={activeTarget === link.target ? 'true' : undefined}
              className={linkClass(activeTarget === link.target)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">{action}</div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="md:hidden p-2 rounded-xl text-[#667085] hover:bg-[#F1F4F9] cursor-pointer"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E6EAF0] bg-white px-4 py-3 space-y-1">
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                goToSection(link.target);
                setOpen(false);
              }}
              aria-current={activeTarget === link.target ? 'true' : undefined}
              className={`block w-full text-right ${linkClass(activeTarget === link.target)}`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">{action}</div>
        </div>
      )}
    </header>
  );
};
