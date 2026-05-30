const GA_MEASUREMENT_ID = "G-XCJR22YSCZ";

export default defineNuxtPlugin(() => {
  const load = () => {
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 4000 });
  } else {
    window.setTimeout(load, 2000);
  }
});
