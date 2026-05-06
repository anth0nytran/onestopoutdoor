'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';
import { ArrowRight, Phone, User, MapPin, ClipboardList, Lock, Calendar, Megaphone } from 'lucide-react';
import { siteConfig } from '../config';
import { Stars } from './Stars';

type Attribution = {
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  landing_page: string;
  captured_at: string;
};

const EMPTY_ATTRIBUTION: Attribution = {
  referrer: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  fbclid: '',
  landing_page: '',
  captured_at: '',
};

const FIRST_TOUCH_KEY = 'osoc_first_touch_v1';
const LAST_TOUCH_KEY = 'osoc_last_touch_v1';
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const isMeaningful = (a: Attribution) =>
  !!(a.utm_source || a.utm_medium || a.utm_campaign || a.gclid || a.fbclid || a.referrer);

const readStored = (key: string): Attribution | null => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    if (parsed.captured_at) {
      const ts = parseInt(parsed.captured_at, 10);
      if (!isNaN(ts) && Date.now() - ts > ATTRIBUTION_TTL_MS) return null;
    }
    return { ...EMPTY_ATTRIBUTION, ...parsed };
  } catch {
    return null;
  }
};

export function EstimateForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formTimestamp] = useState(() => Date.now().toString());
  const [phoneValue, setPhoneValue] = useState('');
  const [firstTouch, setFirstTouch] = useState<Attribution>(EMPTY_ATTRIBUTION);
  const [lastTouch, setLastTouch] = useState<Attribution>(EMPTY_ATTRIBUTION);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const referrer = document.referrer || '';
      const internal = referrer && (() => {
        try { return new URL(referrer).hostname === window.location.hostname; } catch { return false; }
      })();
      const currentVisit: Attribution = {
        referrer: internal ? '' : referrer,
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_term: params.get('utm_term') || '',
        utm_content: params.get('utm_content') || '',
        gclid: params.get('gclid') || '',
        fbclid: params.get('fbclid') || '',
        landing_page: window.location.href,
        captured_at: Date.now().toString(),
      };

      const storedFirst = readStored(FIRST_TOUCH_KEY);
      const storedLast = readStored(LAST_TOUCH_KEY);

      // First touch: only set once. Never overwrite — the original ad click is gold.
      const finalFirst = storedFirst ?? (isMeaningful(currentVisit) ? currentVisit : currentVisit);
      if (!storedFirst) {
        try { window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(finalFirst)); } catch {}
      }

      // Last touch: refresh whenever the current visit has meaningful attribution.
      // Otherwise, keep the prior last-touch (so an ad click → bookmark return doesn't downgrade to "direct").
      const finalLast = isMeaningful(currentVisit)
        ? currentVisit
        : (storedLast ?? currentVisit);
      try { window.localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(finalLast)); } catch {}

      setFirstTouch(finalFirst);
      setLastTouch(finalLast);
    } catch {
      // localStorage unavailable — fall back to per-page capture only
    }
  }, []);

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 10);
    if (!d.length) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const path = typeof window !== 'undefined' ? window.location.pathname : 'unknown';
    const service = String(fd.get('service') || 'Not selected');
    const timeline = String(fd.get('timeline') || 'Not selected');
    const source = String(fd.get('source') || 'Not specified');

    track('Estimate Form Submitted', {
      variant,
      path,
      service,
      timeline,
      source,
      utm_source: lastTouch.utm_source || firstTouch.utm_source || 'none',
      utm_medium: lastTouch.utm_medium || firstTouch.utm_medium || 'none',
      utm_campaign: lastTouch.utm_campaign || firstTouch.utm_campaign || 'none',
    });

    if (typeof window !== 'undefined') {
      fd.set('page', window.location.href);
    }
    if (String(fd.get('website') || '').trim()) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        track('Estimate Form Failed', {
          variant,
          path,
          service,
          timeline,
          source,
          status: res.status,
        });
        setFormStatus('error');
        setFormError(data?.error || 'Something went wrong.');
        return;
      }
      track('Estimate Lead Captured', {
        variant,
        path,
        service,
        timeline,
        source,
        utm_source: lastTouch.utm_source || firstTouch.utm_source || 'none',
        utm_medium: lastTouch.utm_medium || firstTouch.utm_medium || 'none',
        utm_campaign: lastTouch.utm_campaign || firstTouch.utm_campaign || 'none',
      });
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch {
      track('Estimate Form Failed', {
        variant,
        path,
        service,
        timeline,
        source,
        status: 'network',
      });
      setFormStatus('error');
      setFormError('Something went wrong. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  return (
    <div>
      <form className="grid gap-4 sm:gap-4.5" action="/api/lead" method="POST" onSubmit={handleSubmit}>
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="hidden" name="_ts" value={formTimestamp} />
        <input type="hidden" name="referrer" value={lastTouch.referrer || firstTouch.referrer} />
        <input type="hidden" name="utm_source" value={lastTouch.utm_source || firstTouch.utm_source} />
        <input type="hidden" name="utm_medium" value={lastTouch.utm_medium || firstTouch.utm_medium} />
        <input type="hidden" name="utm_campaign" value={lastTouch.utm_campaign || firstTouch.utm_campaign} />
        <input type="hidden" name="utm_term" value={lastTouch.utm_term || firstTouch.utm_term} />
        <input type="hidden" name="utm_content" value={lastTouch.utm_content || firstTouch.utm_content} />
        <input type="hidden" name="gclid" value={lastTouch.gclid || firstTouch.gclid} />
        <input type="hidden" name="fbclid" value={lastTouch.fbclid || firstTouch.fbclid} />
        <input type="hidden" name="landing_page" value={lastTouch.landing_page || firstTouch.landing_page} />
        <input type="hidden" name="first_touch_utm_source" value={firstTouch.utm_source} />
        <input type="hidden" name="first_touch_utm_medium" value={firstTouch.utm_medium} />
        <input type="hidden" name="first_touch_utm_campaign" value={firstTouch.utm_campaign} />
        <input type="hidden" name="first_touch_gclid" value={firstTouch.gclid} />
        <input type="hidden" name="first_touch_fbclid" value={firstTouch.fbclid} />
        <input type="hidden" name="first_touch_referrer" value={firstTouch.referrer} />
        <input type="hidden" name="first_touch_landing_page" value={firstTouch.landing_page} />
        <input type="hidden" name="first_touch_at" value={firstTouch.captured_at} />

        <div className="grid gap-4 sm:gap-4.5 sm:grid-cols-2">
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="name" type="text" placeholder="John Doe" autoComplete="name" pattern="[A-Za-z\s\-']{2,50}" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Phone Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="phone" type="tel" placeholder="(832) 555-0123" autoComplete="tel" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-4.5 sm:grid-cols-2">
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Street Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="address" type="text" placeholder="123 Main St" autoComplete="street-address" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>How Soon? <span className="text-red-500">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select required name="timeline" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
                <option value="" disabled>Select timeline...</option>
                <option value="ASAP">ASAP</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="Just exploring">Just exploring options</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Service Needed <span className="text-red-500">*</span></label>
          <div className="relative">
            <ClipboardList className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select required name="service" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
              <option value="" disabled>Select a service...</option>
              {[siteConfig.primaryService, ...siteConfig.services].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>How Did You Hear About Us? <span className="text-red-500">*</span></label>
          <div className="relative">
            <Megaphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select required name="source" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
              <option value="" disabled>Select source...</option>
              <option value="Google Search">Google Search</option>
              <option value="Google Maps">Google Maps</option>
              <option value="Yelp">Yelp</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Nextdoor">Nextdoor</option>
              <option value="Referral (Friend / Family)">Referral (Friend / Family)</option>
              <option value="Yard Sign / Truck">Yard Sign / Truck</option>
              <option value="Repeat Customer">Repeat Customer</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Availability / Details <span className={`font-normal normal-case tracking-normal ${isDark ? 'text-white/30' : 'text-slate-400'}`}>(Optional)</span></label>
          <textarea name="message" rows={3} maxLength={5000} placeholder="Best days/times for an estimate, project details, or any specific concerns..." className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm min-h-[80px] resize-y" />
        </div>

        <div className="pt-2">
          <button type="submit" disabled={formStatus === 'sending'} className="btn-sheen relative w-full overflow-hidden rounded-lg bg-[var(--onestop-red)] py-4 text-[0.85rem] font-bold uppercase tracking-[0.15em] text-white shadow-lg hover:bg-[var(--onestop-navy-deep)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 group">
            <span className="relative z-10 flex items-center justify-center gap-2">
              {formStatus === 'sending' ? 'Processing...' : 'Get Your Free Estimate'}
              {formStatus !== 'sending' && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </span>
          </button>

          <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-slate-400 font-medium px-2">
            By clicking request, you agree to receive SMS or emails containing details for this estimate and related construction services. Message &amp; data rates may apply. You can reply STOP to opt-out.
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--onestop-navy)]/70">
            <Lock className="h-3 w-3" />
            <span>100% Secure &amp; Confidential</span>
          </div>
        </div>

        {formStatus === 'success' && <div role="status" aria-live="polite" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium">Got it — we&apos;ll be in touch shortly to schedule your free estimate.</div>}
        {formStatus === 'error' && <div role="alert" aria-live="assertive" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 font-medium">{formError}</div>}
      </form>

      <div className="mt-5 flex items-center justify-center gap-3 text-xs text-slate-400">
        <Stars count={5} size="h-3 w-3" />
        <span className="font-bold text-slate-600">{siteConfig.rating.toFixed(1)}</span>
        <span>|</span>
        <span>5-Star Rated on Google</span>
      </div>
    </div>
  );
}
