const GA_ID = 'G-XCJR22YSCZ';
const COOKIE = 'ga_consent';
const DOMAIN = '.tyleringersoll.com';

function getCookie(n) {
  const m = document.cookie.match('(?:^|;)\\s*' + n + '=([^;]*)');
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(n, v, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${n}=${encodeURIComponent(v)}; expires=${exp}; path=/; domain=${DOMAIN}; SameSite=Lax; Secure`;
}

export default defineNuxtPlugin(() => {
  if (import.meta.dev) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  const needsConsent = window.VISITOR_REQUIRES_CONSENT === true;
  const forceConsentBanner = window.VISITOR_FORCE_CONSENT_BANNER === true;
  const saved = getCookie(COOKIE);
  const hasAnalyticsConsent = !needsConsent || (!forceConsentBanner && saved === 'granted');
  const bannerWillShow = needsConsent && (!saved || forceConsentBanner);

  const grantedConsent = {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  };
  const deniedConsent = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };

  gtag('consent', 'default', hasAnalyticsConsent
    ? grantedConsent
    : (bannerWillShow ? { ...deniedConsent, wait_for_update: 500 } : deniedConsent));

  const load = () => {
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  };

  const startAnalytics = () => {
    if (window.__analyticsStarted) return;
    window.__analyticsStarted = true;
    gtag('js', new Date());
    gtag('config', GA_ID);

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load, { timeout: 4000 });
    } else {
      setTimeout(load, 2000);
    }
  };

  // Always start — consent state controls what GA sends (G111 vs G100), not whether it runs
  startAnalytics();

  if (needsConsent && (!saved || forceConsentBanner)) {
    const showBanner = () => {
      const el = document.createElement('div');
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', 'Cookie consent');
      el.innerHTML = `
        <div style="max-width:760px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px">
          <p style="margin:0;flex:1 1 220px;font-size:14px;line-height:1.5">
            We use cookies to understand how visitors use this site.
          </p>
          <div style="display:flex;gap:10px;flex-shrink:0">
            <button id="ga-decline" type="button"
              style="padding:8px 18px;border:1px solid rgba(255,255,255,0.3);background:transparent;
                     color:#fff;border-radius:6px;font-size:14px;cursor:pointer">Decline</button>
            <button id="ga-accept" type="button"
              style="padding:8px 20px;border:none;background:#fff;color:#111;
                     border-radius:6px;font-size:14px;font-weight:600;cursor:pointer">Accept</button>
          </div>
        </div>`;
      Object.assign(el.style, {
        position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '9999',
        background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(8px)',
        color: '#fff', padding: '16px 24px', boxSizing: 'border-box',
        display: 'flex', justifyContent: 'center',
        fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.4)',
      });
      document.body.appendChild(el);

      document.getElementById('ga-accept').onclick = () => {
        setCookie(COOKIE, 'granted', 365);
        window.gtag('consent', 'update', grantedConsent);
        el.remove();
      };
      document.getElementById('ga-decline').onclick = () => {
        setCookie(COOKIE, 'denied', 365);
        window.gtag('consent', 'update', deniedConsent);
        el.remove();
      };
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(showBanner, { timeout: 2000 });
    } else {
      setTimeout(showBanner, 500);
    }
  }
});
