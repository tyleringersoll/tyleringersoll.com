import { nextTick } from 'vue';

export function useScrollToHash() {
  const scrollToHash = async (hash) => {
    if (!hash) return;
    await nextTick();
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (!el) return;
      const header = document.querySelector('.header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  return { scrollToHash };
}
