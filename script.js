const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const primaryNavigation = document.querySelector('#primary-navigation');

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

setTheme(document.documentElement.dataset.theme || 'dark');

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
