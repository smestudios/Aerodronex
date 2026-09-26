const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    const end = Number(target.dataset.count);
    const start = performance.now();
    const duration = 1150;
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      target.textContent = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    observer.unobserve(target);
  });
});

document.querySelectorAll('[data-count]').forEach((counter) => countObserver.observe(counter));
