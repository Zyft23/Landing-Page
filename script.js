const slides = [...document.querySelectorAll('.testimonial-slide')];
const dots = [...document.querySelectorAll('.testimonial-dot')];
const previousButton = document.querySelector('[data-testimonial-prev]');
const nextButton = document.querySelector('[data-testimonial-next]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const primaryNavigation = document.querySelector('#primary-navigation');
let activeSlide = 0;

function setTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute('content', isLight ? '#f4f7f3' : '#121412');
}

let savedTheme = null;
try {
    savedTheme = localStorage.getItem('arz-theme');
} catch {}
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
        localStorage.setItem('arz-theme', nextTheme);
    } catch {}
});

function setMenuOpen(isOpen) {
    if (!menuToggle || !primaryNavigation) return;

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    primaryNavigation.classList.toggle('is-open', isOpen);
}

menuToggle?.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

primaryNavigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

window.matchMedia('(min-width: 641px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
});

function showTestimonial(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', String(isActive));
    });
}

if (slides.length > 0 && previousButton && nextButton) {
    previousButton.addEventListener('click', () => showTestimonial(activeSlide - 1));
    nextButton.addEventListener('click', () => showTestimonial(activeSlide + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
}

const revealElements = document.querySelectorAll(
    '.benefit-card, .project-card, .testimonials .section-heading, .testimonial-carousel, .contact-card'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element, index) => {
        element.classList.add('js-reveal');
        element.style.transitionDelay = `${(index % 3) * 110}ms`;
        revealObserver.observe(element);
    });
}