import React from 'react';
import { Megaphone, RotateCcw } from 'lucide-react';
import { api } from '../../api';
import { useApiQuery } from '../../hooks/useApiQuery';
import { AdSlider } from './AdSlider';

/**
 * Platform advertisement section: the live announcements IMC published
 * (GET /public/announcements, ADR-022), in their display order. The slide period is the
 * admin-set rotation kept in local storage (see AdSlider). Self-contained wrapper
 * (own margins/width); with no live announcement the section is not shown.
 */
export const AdStrip: React.FC = () => {
  const ads = useApiQuery((signal) => api.announcements.publicList(signal), []);

  const items = ads.data ?? [];
  if (ads.status === 'success' && items.length === 0) return null;

  return (
    <section className="jahez-ad-strip" dir="rtl" aria-label="إعلانات المنصة" data-ads-state={ads.status}>
      <div className="jahez-ad-strip__head">
        <span className="jahez-ad-strip__title">
          <Megaphone aria-hidden="true" />
          إعلانات وحملات المنصة
        </span>
      </div>
      {ads.status === 'success' && <AdSlider ads={items} />}
      {ads.status === 'loading' && (
        <div className="w-full h-[320px] rounded-3xl bg-white/70 border border-[#E6EAF0] animate-pulse" aria-busy="true" aria-label="جارٍ تحميل الإعلانات" />
      )}
      {ads.status === 'error' && (
        <div role="status" className="flex items-center justify-center gap-3 py-6 text-xs text-[#667085]">
          تعذّر تحميل الإعلانات حاليًا.
          <button type="button" onClick={ads.refetch} className="inline-flex items-center gap-1 font-semibold text-[#003E82] hover:underline cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> إعادة المحاولة
          </button>
        </div>
      )}
    </section>
  );
};
