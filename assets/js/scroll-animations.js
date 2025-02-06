document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for scroll animations
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only animate once when element comes into view
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('visible', 'animated');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
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

    // Initialize lazy loading for images
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('lazy-image');
                    
                    img.onload = () => {
                        img.classList.add('loaded');
                    };

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
}); 