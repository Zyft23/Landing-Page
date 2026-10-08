const slides = [...document.querySelectorAll('.testimonial-slide')];
const dots = [...document.querySelectorAll('.testimonial-dot')];
const previousButton = document.querySelector('[data-testimonial-prev]');
const nextButton = document.querySelector('[data-testimonial-next]');
let activeSlide = 0;

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
        element.style.transitionDelay = `${(index % 3) * 90}ms`;
        revealObserver.observe(element);
    });
}