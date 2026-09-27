const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const whatsappBase = 'https://wa.me/message/RI2CXZHXPXVJA1';

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.quote-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const product = button.dataset.product;
    if (!product) return;

    event.preventDefault();
    const message = `Hola, quiero cotizar el ${product}. ¿Me pueden brindar más información?`;
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    target.classList.add('visible');
    observer.unobserve(target);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
