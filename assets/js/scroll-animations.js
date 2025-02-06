document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for scroll animations
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate how far the element is from the top of the viewport
                const elementTop = entry.boundingClientRect.top;
                const windowHeight = window.innerHeight;
                const scrollProgress = 1 - (elementTop / windowHeight);
                
                // Trigger animation earlier (reduced from 0.1 to 0.05)
                if (scrollProgress >= 0.05 && !entry.target.classList.contains('animated')) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible', 'animated');
                    });
                }
            }
        });
    }, {
        // More frequent threshold checks for smoother detection
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3],
        // Increased top margin to start animations earlier (-20% instead of -10%)
        rootMargin: '-20% 0px -10% 0px'
    });

    // Add animation classes to sections and observe them
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        animateObserver.observe(section);
    });

    // Add stagger animation to skills section
    const skillsRow = document.querySelector('#skills .row');
    if (skillsRow) {
        skillsRow.classList.add('scroll-animate', 'stagger');
        animateObserver.observe(skillsRow);
    }

    // Add stagger animation to projects section
    const projectsRow = document.querySelector('#projects .row');
    if (projectsRow) {
        projectsRow.classList.add('scroll-animate', 'stagger');
        animateObserver.observe(projectsRow);
    }

    // Initialize lazy loading for images with progressive loading
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    // Create a new image to preload
                    const preloadImg = new Image();
                    preloadImg.onload = () => {
                        img.src = preloadImg.src;
                        img.classList.add('lazy-image');
                        
                        // Small delay before adding loaded class for smooth transition
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                img.classList.add('loaded');
                            }, 50);
                        });
                    };
                    preloadImg.src = img.dataset.src;
                    lazyImageObserver.unobserve(img);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Convert images to lazy load
    const images = document.querySelectorAll('.image.fit.thumb img, .image.avatar img');
    images.forEach(img => {
        const originalSrc = img.src;
        img.dataset.src = originalSrc;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent placeholder
        lazyImageObserver.observe(img);
    });

    // Disable animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => {
            el.classList.remove('scroll-animate');
            el.classList.add('visible');
        });
    }
}); 