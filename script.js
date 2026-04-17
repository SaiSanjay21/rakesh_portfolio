document.addEventListener('DOMContentLoaded', () => {

    // 2. Navbar glass effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Scroll Animations (Fade in up)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Adding a stagger effect if elements are grouped
            const parentGroup = entry.target.closest('.staggered-group');
            if (parentGroup) {
                const siblings = Array.from(parentGroup.querySelectorAll('.fade-in-up'));
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }

            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Initial load animation for hero section
    setTimeout(() => {
        const heroElems = document.querySelectorAll('#hero .fade-in-up');
        heroElems.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.2}s`;
            el.classList.add('visible');
            el.classList.remove('hidden');
        });
    }, 100);
});
