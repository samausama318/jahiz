import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  Briefcase,
  ArrowLeft,
  UserPlus,
  Layers,
  FileCheck,
} from 'lucide-react';
import { SlideTabs } from '../ui/slide-tabs';
import type { SlideTabItem } from '../ui/slide-tabs';
import { useAuth } from '../../auth/authContext';
import type { Role } from '../../api';
import heroCardSvg from '../../assets/jahiz-hero-card.svg';

const DEFAULT_HEADLINE = 'جاهزية المصانع لمستقبل رقمي';

const HEADLINE_BY_TAB: Record<string, string> = {
  home: DEFAULT_HEADLINE,
  assessment: 'اعرف مستوى جاهزية مصنعك',
  digital: 'اكتشف أولويات التحول الرقمي',
  smart: 'خطوتك نحو مصنع أكثر ذكاءً',
  results: 'حوّل البيانات إلى قرارات',
};

const TABS: SlideTabItem[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'assessment', label: 'التقييم' },
  { id: 'digital', label: 'التحول الرقمي' },
  { id: 'smart', label: 'المصانع الذكية' },
  { id: 'results', label: 'النتائج' },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user, status } = useAuth();
  const reduced = useReducedMotion() === true;
  const [activeTab, setActiveTab] = useState('home');

  const resolving = status === 'loading';
  const isVisitor = !user && !resolving;
  const showPortal = (role: Role) => !resolving && (!user || user.role === role);

  const headline = HEADLINE_BY_TAB[activeTab] ?? DEFAULT_HEADLINE;

  const scrollToHow = () => {
    const target = document.getElementById('how');
    if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    else navigate('/');
  };

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative w-full overflow-hidden bg-[#020817]"
    >
      {/* Premium futuristic backdrop: deep navy base + atmospheric glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_30%,rgba(8,119,232,0.36),rgba(4,32,74,0.18)_45%,transparent_78%)]"
        animate={reduced ? undefined : { opacity: [0.78, 1, 0.78] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_34%,rgba(62,232,255,0.14),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-[radial-gradient(ellipse_90%_75%_at_50%_-15%,rgba(12,64,140,0.40),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[26%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,240,255,0.13),transparent_65%)] blur-2xl"
      />
      {/* Balanced warm orange core, centered in the hero */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_46%_at_50%_55%,rgba(255,138,0,0.26),rgba(232,91,0,0.09)_50%,transparent_76%)]"
        animate={reduced ? undefined : { opacity: [0.82, 1, 0.82] }}
        transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Contrast vignette: darker edges so the center reads brighter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_78%_at_50%_45%,transparent_36%,rgba(1,3,10,0.60)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#01040D] to-transparent"
      />
      {/* Very subtle orange edge accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[rgba(255,138,0,0.4)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-64 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.12),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.10),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-5">
          <motion.div
            className="flex flex-col items-start text-start"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: 'easeOut' }}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_72%)]"
              />
              <img
                src="/jahiz-logo-vector.svg"
                alt="Jahiz"
                className="relative h-10 w-auto object-contain sm:h-12 lg:h-14"
              />
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF8A00] sm:text-sm">
              التحول الرقمي يبدأ من هنا
            </p>

            <div className="mt-4 w-full max-w-xl">
              <SlideTabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} ariaLabel="محاور الواجهة الرئيسية" />
            </div>

            <div className="mt-4 w-full min-h-[4.25rem] sm:min-h-[4.75rem] lg:min-h-[5.75rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h1
                  key={activeTab}
                  id="hero-headline"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.26, ease: 'easeOut' }}
                  className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {headline}
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/70 sm:text-base lg:text-lg">
              المنصة الوطنية لربط المنشآت الصناعية بمزودي حلول الأتمتة والذكاء الاصطناعي، بإشراف وحوكمة معتمدة من{' '}
              <strong className="font-bold text-[#FF8A00]">مركز تحديث الصناعة (IMC)</strong>.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/factory/assessment')}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#FF8A00] px-6 py-3 text-sm font-bold text-white shadow-md shadow-black/10 transition-colors duration-200 hover:bg-[#E85B00] focus-visible:ring-2 focus-visible:ring-[#E85B00] focus-visible:ring-offset-2 focus-visible:outline-none sm:text-base"
              >
                ابدأ تقييم مصنعك
              </button>
              <button
                type="button"
                onClick={scrollToHow}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/35 bg-transparent px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] focus-visible:outline-none sm:text-base"
              >
                اكتشف كيف يعمل
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-2.5">
              {[
                { icon: ShieldCheck, label: 'حوكمة IMC المعتمدة', color: 'text-[#1D7E4C]' },
                { icon: Layers, label: 'كتالوج معتمد في 7 تصنيفات', color: 'text-[#0754A6]' },
                { icon: FileCheck, label: 'تقييم الجاهزية الرقمية للمصنع', color: 'text-[#003E82]' },
              ].map((fact, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E6EAF0] bg-white/85 px-3 py-1.5 text-[11px] font-bold text-[#344054] shadow-xs backdrop-blur-md"
                >
                  <fact.icon className={`w-3.5 h-3.5 ${fact.color}`} />
                  {fact.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex min-h-[160px] items-center justify-center lg:min-h-[210px]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.12, ease: 'easeOut' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_55%,rgba(2,8,23,0.70),transparent_78%)]"
            />

            <motion.div
              className="relative flex w-full max-w-md flex-col items-center justify-center px-2 py-2 text-center"
              animate={reduced ? undefined : { y: [0, -7, 0] }}
              transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative">
                <span className="relative block">
                  <span className="relative block bg-[linear-gradient(180deg,#EAFDFF_0%,#9DF0FF_12%,#2ED3FF_26%,#0877E8_46%,#014FA8_62%,#003E82_74%,#012B57_84%,#FF8A00_95%,#E85B00_100%)] bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent [-webkit-text-stroke:2.5px_#3EE8FF] [filter:drop-shadow(0_0_12px_rgba(45,212,255,0.5))_drop-shadow(0_10px_18px_rgba(0,10,32,0.85))] sm:text-7xl lg:text-8xl">
                    جاهز<span className="text-[#FF8A00] [-webkit-text-stroke-width:0px] [text-shadow:0_0_18px_rgba(255,138,0,0.6)]">.</span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-3 block h-1.5 w-32 rounded-full bg-[linear-gradient(90deg,#FF8A00_0%,#FFB067_100%)]"
                />
                <span
                  dir="ltr"
                  className="relative mt-3 block bg-[linear-gradient(180deg,#EAFDFF_0%,#9DF0FF_14%,#2ED3FF_30%,#0877E8_50%,#014FA8_66%,#003E82_78%,#012B57_86%,#FF8A00_95%,#E85B00_100%)] bg-clip-text text-3xl font-black uppercase tracking-[0.45em] text-transparent [-webkit-text-stroke:1.5px_#3EE8FF] [filter:drop-shadow(0_0_12px_rgba(45,212,255,0.55))_drop-shadow(0_8px_16px_rgba(0,10,32,0.8))] sm:text-4xl lg:text-[2.9rem]"
                >
                  JAHIZ
                </span>
              </div>

              {/* Tech factory card under the wordmark (left side) */}
              <motion.div
                aria-hidden="true"
                className="mt-5 w-full overflow-hidden rounded-2xl border border-[rgba(255,138,0,0.32)] shadow-[0_18px_50px_rgba(1,6,20,0.65),0_0_30px_rgba(255,138,0,0.16)]"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.35, ease: 'easeOut' }}
              >
                <div className="relative isolate h-36 w-full overflow-hidden sm:h-40 lg:h-44">
                  <motion.img
                    src={heroCardSvg}
                    alt=""
                    loading="lazy"
                    className="h-full w-full scale-[1.04] object-cover object-[center_35%]"
                    animate={reduced ? undefined : { scale: [1.04, 1.11] }}
                    transition={reduced ? undefined : { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  />
                  {/* Orange blends: merge the image colors with the hero accent */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,138,0,0.30)_0%,rgba(255,138,0,0.07)_45%,rgba(2,8,23,0.22)_100%)] mix-blend-overlay" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_80%_at_60%_35%,rgba(255,138,0,0.22),transparent_65%)] mix-blend-soft-light" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.10)_0%,rgba(2,8,23,0.05)_55%,rgba(2,8,23,0.55)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(62,232,255,0.55),rgba(255,138,0,0.8),transparent)]" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 text-right sm:grid-cols-2 lg:grid-cols-4">
          {showPortal('factory_member') && (
            <div
              onClick={() => navigate('/factory/dashboard')}
              className="jahez-card p-4.5 cursor-pointer text-right group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#E3F0FD] text-[#0754A6] flex items-center justify-center group-hover:bg-[#0877E8] group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <ArrowLeft className="w-4 h-4 text-[#98A2B3] group-hover:text-[#003E82] group-hover:-translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#172033] group-hover:text-[#003E82] transition-colors">بوابة المنشآت والمصانع</h4>
              <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                تقييم الجدارة الرقمية، اكتشاف الحلول، وطلب خدمات التحول الذكي.
              </p>
            </div>
          )}

          {showPortal('provider_member') && (
            <div
              onClick={() => navigate('/provider/dashboard')}
              className="jahez-card p-4.5 cursor-pointer text-right group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E6] text-[#003E82] flex items-center justify-center group-hover:bg-[#FF8A00] group-hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <ArrowLeft className="w-4 h-4 text-[#98A2B3] group-hover:text-[#003E82] group-hover:-translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#172033] group-hover:text-[#003E82] transition-colors">بوابة مزودي الخدمات</h4>
              <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                طرح الحلول الصناعية، استقبال طلبات المصانع، ومساحة التفاوض.
              </p>
            </div>
          )}

          {showPortal('imc_admin') && (
            <div
              onClick={() => navigate('/admin/dashboard')}
              className="jahez-card p-4.5 cursor-pointer text-right group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#E7F8EE] text-[#1D7E4C] flex items-center justify-center group-hover:bg-[#35B779] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <ArrowLeft className="w-4 h-4 text-[#98A2B3] group-hover:text-[#003E82] group-hover:-translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#172033] group-hover:text-[#003E82] transition-colors">إدارة وحوكمة المنظومة (IMC)</h4>
              <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                اعتماد المزودين بالمعايير الخمسة، توثيق العقود، والرقابة المالية.
              </p>
            </div>
          )}

          {isVisitor && (
            <div className="jahez-card p-4.5 text-right group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E2] text-[#B26A09] flex items-center justify-center group-hover:bg-[#F2B84B] group-hover:text-white transition-colors">
                  <UserPlus className="w-5 h-5" />
                </div>
              </div>
              <h4 className="font-bold text-sm text-[#172033] group-hover:text-[#003E82] transition-colors">التسجيل والانضمام</h4>
              <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                اشترك في المنصة كمنشأة صناعية أو كمزود خدمة معتمد.
              </p>
              <div className="flex gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={() => navigate('/register/factory')}
                  className="flex-1 py-1.5 rounded-lg bg-[#E3F0FD] text-[#0754A6] text-[11px] font-bold hover:bg-[#0877E8] hover:text-white transition-colors cursor-pointer"
                >
                  تسجيل منشأة
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register/provider')}
                  className="flex-1 py-1.5 rounded-lg bg-[#FFF3E6] text-[#003E82] text-[11px] font-bold hover:bg-[#FF8A00] hover:text-white transition-colors cursor-pointer"
                >
                  تسجيل مزود
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
